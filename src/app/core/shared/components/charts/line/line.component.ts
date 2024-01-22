import {Component, ViewChild} from '@angular/core';
import {ChartOptions} from "../../../../../demo/chart/apex-chart/apex-chart.component";
import {ChartComponent} from "ng-apexcharts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          fontSize: 'string',
          fontWeight: 50 ,
          colors: ["#4ECB71"],
        }
      },
      stroke: {
        show: true,
        curve: "smooth",
        colors: ["#4ECB71"],
      },
      tooltip:{
        enabled: true
      },
      // title: {
      //   text: "Product Trends by Month",
      //   align: "left",
      // },
      grid: {
        show: true,
        xaxis: {
          lines: {show: true}
        },
        yaxis: {
          lines: {show: true}
        }
        // row: {
        //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //   opacity: 0.5
        // }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };
  }
}
