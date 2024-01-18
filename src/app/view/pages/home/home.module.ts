import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";
import ApexChartComponent from "../../../demo/chart/apex-chart/apex-chart.component";
import {CardModule} from "../../../theme/shared/components";
import {NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgApexchartsModule,
    ApexChartComponent,
    CardModule,
    NgbProgressbar,
    ApexChartComponent
  ]
})
export class HomeModule {
}
