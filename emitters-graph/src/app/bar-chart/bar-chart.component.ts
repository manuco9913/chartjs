import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

const EMITTERS_RADIUS = 10;
const MAX_EMITTERS_IN_GRAPH = 100000;
const MAX_FREQ = 40;
const MIN_FREQ = 0;
const MAX_ANGLE = 180;
const MIN_ANGLE = -180;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.barChartMethod();

  }

  createRandNumOfEmitters() {
    let emittersArrData: { x: number, y: number, r: number }[] = [];

    for (let i = 1; i < Math.floor(Math.random() * MAX_EMITTERS_IN_GRAPH); i++) {
      let xVal = Math.floor(Math.random() * MAX_ANGLE);
      let xSign = Math.random() > 0.5 ? 1 : -1;

      emittersArrData.push({
        x: xSign * xVal,
        y: Math.random() * MAX_FREQ,
        r: EMITTERS_RADIUS
      })
    }
    return emittersArrData;
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'First Dataset',
          data: this.createRandNumOfEmitters(),
          backgroundColor: 'rgb(0, 99, 132)',
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
        }
      }
    });

    console.log(this.barChart);

  }
}
