import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { TooltipItem } from 'chart.js/auto';
import { CustomDataTypeService } from '../custom/custom-data-type.service';

const EMITTERS_RADIUS = 15;
const MAX_EMITTERS_IN_GRAPH = 1000;
const MAX_FREQ = 40;
const MIN_FREQ = 0;
const MAX_ANGLE = 180;
const MIN_ANGLE = -180;
const DATA_REFRESHING_TIMEOUT = 20;
const SHOW_EMITTERS_INTERVAL = 500;
const BLINKING_TIME = 5000;

let emittersAdditionalData: string[] = [];


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: Chart;

  ngAfterViewInit(): void {
    this.barChartMethod();
  }

  createRandNumOfEmitters = () => {
    // this.barChart.data.datasets[0].data = [x:1,y:2,r:2,arr:8];
    // this.barChart.data.datasets[0].data = [new CustomDataTypeService(1,2,2,8)];

    for (let i = 1; i < Math.floor(Math.random() * MAX_EMITTERS_IN_GRAPH); i++) {
      let xVal = Math.floor(Math.random() * MAX_ANGLE);
      let xSign = Math.random() > 0.5 ? 1 : -1;

      emittersAdditionalData.push(`Additional data of emitter ${i - 1}`)

      this.barChart.data.datasets[0].data.push({
        x: xSign * xVal,
        y: Math.random() * MAX_FREQ,
        r: EMITTERS_RADIUS
      })
    }

    this.showNewEmitters();
  }

  showNewEmitters = () => {

    const interval = setInterval(() => {
      this.barChart.update('show');
    }, SHOW_EMITTERS_INTERVAL);

    setTimeout(() => {
      clearInterval(interval);
    }, BLINKING_TIME);
  }

  barChartMethod() {

    Chart.defaults.plugins.tooltip.displayColors = false;
    Chart.defaults.plugins.tooltip.titleAlign = 'center';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0,80,80,0.8)';
    Chart.defaults.elements.point.pointStyle = 'rect';

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bubble',
      data: {
        labels: ['#', 'A', 'B', 'C', 'D'],
        datasets: [{
          data: [],
          backgroundColor: 'rgb(0, 200, 200)',
          borderColor: 'rgba(0, 0, 0)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          x: {
            max: MAX_ANGLE,
            min: MIN_ANGLE
          },
          y: {
            max: MAX_FREQ,
            min: MIN_FREQ
          }
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
                return [`Freq: ${tooltipItem.parsed.y.toFixed(2)}`,
                `Angle: ${tooltipItem.parsed.x}`];
              },
              afterLabel: function (tooltipItem: TooltipItem<'bubble'>) {
                return emittersAdditionalData[tooltipItem.dataIndex];
              },
            },
          },
          datalabels: {
            formatter: function (value, context) {
              let labelsArr = context.chart.data.labels;
              return labelsArr![context.dataIndex % labelsArr!.length];
            },
            color: 'black',
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              },
              value: {
                color: 'green'
              }
            }
          }
        }
      }
    });

    // setInterval(this.createRandNumOfEmitters, DATA_REFRESHING_TIMEOUT);
    this.createRandNumOfEmitters();
  }
}