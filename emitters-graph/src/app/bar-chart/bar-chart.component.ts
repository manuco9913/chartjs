import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

const EMITTERS_RADIUS = 15;
const MAX_FREQ = 40;
const MAX_ANGLE = 360;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  emittersArrData: {x:number, y:number, r:number}[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.createRandNumOfEmitters();
    this.barChartMethod();

  }

  createRandNumOfEmitters() {
    for( let i = 1; i < Math.floor(Math.random() * 15); i++){
      this.emittersArrData.push({
        x: Math.floor(Math.random() * MAX_ANGLE),
        y: Math.random() * MAX_FREQ,
        r: EMITTERS_RADIUS
      })
    }
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'First Dataset',
          data: this.emittersArrData,
          backgroundColor: 'rgb(0, 99, 132)'
        }]
      },
    });

    console.log(this.barChart);
    
  }
}
