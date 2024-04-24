import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string | any;
  markers: any;
  grid: ApexGrid | any;
};

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './sales-summary.component.html',
  styleUrl: './sales-summary.component.css',
})
export class SalesSummaryComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor() {
    this.salesChartOptions = {
      series: [
        {
          name: 'Accepted',
          data: [0, 31, 40, 28, 51, 42, 109],
        },
        {
          name: 'Rejected',
          data: [0, 11, 32, 45, 32, 34, 52],
        },
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        height: 280,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: '1',
      },
      grid: {
        strokeDashArray: 3,
      },

      xaxis: {
        categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      },
      tooltip: {
        theme: 'light',
      },
      colors: ['grey', 'black'],
    };
  }

  ngOnInit(): void {}
}
