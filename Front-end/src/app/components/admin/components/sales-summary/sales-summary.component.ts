import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

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
import { OrderService } from '../../Services/order.service';

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
  providers: [OrderService],
})
export class SalesSummaryComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  // ngAfterViewInit(): void {}
  public salesChartOptions: Partial<salesChartOptions> = {
    series: [
      {
        name: 'Total Sales',
        data: [], // Initialize with empty array
      },
    ],
    chart: {
      fontFamily: 'Nunito Sans, sans-serif',
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
      categories: [], // Initialize with empty array
    },
    tooltip: {
      theme: 'light',
    },
    colors: ['grey'],
  };

  constructor(private myorderService: OrderService) {}

  ngOnInit() {
    this.myorderService.salesPerWeek().subscribe(
      (data) => {
        // Map totalSales values to the data property of the series
        this.salesChartOptions.series[0].data = (data as any[]).map(
          (item) => item.totalSales
        );

        console.log(this.salesChartOptions.series[0].data);

        // Map dates to the categories of the x-axis
        this.salesChartOptions.xaxis.categories = (data as any[]).map(
          (item) => item.date
        );
        console.log(this.salesChartOptions.xaxis.categories);

        // After updating the chart options, refresh the chart
        if (this.chart) {
          this.chart.updateOptions(this.salesChartOptions);
        }

        console.log(this.salesChartOptions);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
