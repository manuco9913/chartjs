import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import Chart, { TooltipItem } from 'chart.js/auto';
import { InnerDataType } from '../custom/custom-data-type.service';
import {
  Mutex,
  MutexInterface,
  Semaphore,
  SemaphoreInterface,
  withTimeout,
} from 'async-mutex';

const EMITTERS_RADIUS = 15;
const MAX_EMITTERS_IN_GRAPH = 10000;
const MAX_FREQ = 40;
const MIN_FREQ = 0;
const MAX_ANGLE = 180;
const MIN_ANGLE = -180;
const DATA_REFRESHING_TIMEOUT = 20;
const SHOW_EMITTERS_INTERVAL = 1000;
const HIDE_EMITTERS_INTERVAL = 2 * SHOW_EMITTERS_INTERVAL;
const BLINKING_TIME = 10000;
const SHOWN_DATASET = 0;
const HIDDEN_DATASET = 1;

let emittersAdditionalData: string[] = [];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: Chart;
  mutex: any;

  ngAfterViewInit(): void {
    this.barChartMethod();
    this.mutex = new Mutex();
  }

  createRandNumOfEmitters = () => {
    const labelsArr = ['#', 'A', 'B', 'C', 'D'];

    for (
      let i = 1;
      i < Math.floor(Math.random() * MAX_EMITTERS_IN_GRAPH);
      i++
    ) {
      let xVal = Math.floor(Math.random() * MAX_ANGLE);
      let xSign = Math.random() > 0.5 ? 1 : -1;

      emittersAdditionalData.push(`Additional data of emitter ${i - 1}`);

      this.barChart.data.datasets[SHOWN_DATASET].data.push({
        x: xSign * xVal,
        y: Math.random() * MAX_FREQ,
        r: EMITTERS_RADIUS,
        status: 'l',
        ident: labelsArr[i % labelsArr.length],
      } as InnerDataType);
    }
    this.barChart.data.datasets[HIDDEN_DATASET].data = new Array(
      this.barChart.data.datasets[SHOWN_DATASET].data.length
    );
    [1, 5, 15, 20].forEach((index) => {
      this.barChart.data.datasets[HIDDEN_DATASET].data[index] =
        this.barChart.data.datasets[SHOWN_DATASET].data[index];
    });
    this.showNewEmitters([1, 5, 15, 20]);
  };

  moveEmittersBetweenDatasets = (
    indexes: number[],
    srcDataset: number,
    dstDataset: number
  ) => {
    indexes.forEach((index) => {
      let emitter = this.barChart.data.datasets[srcDataset].data[index]; //TODO: BUG: not working because DataElementType copy ctor is needed

      this.mutex.runExclusive(() => {
        this.barChart.data.datasets[srcDataset].data[index] = null;
        this.barChart.data.datasets[dstDataset].data[index] = emitter;
      });
    });

    this.barChart.update('none');
  };

  showNewEmitters = (newEmittersIndexes: number[]) => {
    const interval_1 = setInterval(() => {
      //show
      this.moveEmittersBetweenDatasets(
        newEmittersIndexes,
        HIDDEN_DATASET,
        SHOWN_DATASET
      );
    }, SHOW_EMITTERS_INTERVAL);

    const interval_2 = setInterval(() => {
      //hide
      this.moveEmittersBetweenDatasets(
        newEmittersIndexes,
        SHOWN_DATASET,
        HIDDEN_DATASET
      );
    }, HIDE_EMITTERS_INTERVAL);

    setTimeout(() => {
      clearInterval(interval_1);
      clearInterval(interval_2);
      this.moveEmittersBetweenDatasets(
        newEmittersIndexes,
        HIDDEN_DATASET,
        SHOWN_DATASET
      );
    }, BLINKING_TIME);
  };

  barChartMethod() {
    Chart.defaults.plugins.tooltip.displayColors = false;
    Chart.defaults.plugins.tooltip.titleAlign = 'center';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0,80,80,0.8)';
    Chart.defaults.elements.point.pointStyle =    'rect'                            ;

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Datatset 1',
            data: [],
            backgroundColor: 'rgba(0, 250, 250, 0.8)',
            borderColor: 'rgba(0, 0, 0)',
            borderWidth: 1,
          },
          {
            label: 'Dataset 2',
            data: [],
            hidden: false,
            backgroundColor: 'rgb(0, 255, 0)',
            borderColor: 'rgba(0, 0, 0)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            max: MAX_ANGLE,
            min: MIN_ANGLE,
          },
          y: {
            max: MAX_FREQ,
            min: MIN_FREQ,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              beforeTitle: function (tooltipItems: TooltipItem<'bubble'>[]) {
                let tooltipText = '';
                tooltipItems.forEach(function (tooltipItem) {
                  tooltipText = `ID: ${tooltipItem.dataIndex}`;
                });
                return tooltipText;
              },
              label: function (tooltipItem: TooltipItem<'bubble'>) {
                return [
                  `Freq: ${tooltipItem.parsed.y.toFixed(2)}`,
                  `Angle: ${tooltipItem.parsed.x}`,
                  `Ident: ${
                    (
                      tooltipItem.chart.data.datasets[SHOWN_DATASET].data[
                        tooltipItem.dataIndex
                      ] as InnerDataType
                    ).ident
                  }`,
                ];
              },
              afterLabel: function (tooltipItem: TooltipItem<'bubble'>) {
                return emittersAdditionalData[tooltipItem.dataIndex];
              },
            },
          },
          datalabels: {
            formatter: function (value, context) {
              return (
                context.chart.data.datasets[SHOWN_DATASET].data[
                  context.dataIndex
                ] as InnerDataType
              ).ident;
            },
            color: 'black',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                },
              },
              value: {
                color: 'green',
              },
            },
          },
        },
      },
      plugins: [
        {
          id: 'myEventCatcher',
          beforeEvent(chart, args, pluginOptions) {
            const event = args.event;
            if (event.type === 'mouseout') {
              // process the event
            }
          },
        },
      ],
    });

    // setInterval(this.createRandNumOfEmitters, DATA_REFRESHING_TIMEOUT);
    this.createRandNumOfEmitters();
  }
}
