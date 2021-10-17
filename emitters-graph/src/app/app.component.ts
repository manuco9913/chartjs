import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'emitters-graph';

  constructor() {
    // Register the plugin to all charts:
    Chart.register(ChartDataLabels);
  }
}
