import { Component, ViewChild } from "@angular/core";
import { ApexChartsModule } from '../apex-charts/apex-charts.module';

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  fill: any;
  colors: any;
  legend: any;
};

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  imports: [ApexChartsModule],
  standalone: true
})
export class ChartViewComponent {
  @ViewChild("chart") chart?: ApexChartsModule;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13],
      chart: {
        type: "donut"
      },
      labels: ["Waiting", "In Transit", "Delivered"],
      fill: ["#FFFFFF", "#00E396", "#008FFB"],
      colors: ["#FF0000", "#E9802B", "#00FF00"],
      legend: {
        position: "top",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 20,
          height: 20
        },
        itemMargin: {
          vertical: 10
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
