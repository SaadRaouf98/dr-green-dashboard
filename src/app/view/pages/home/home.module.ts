import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";
import ApexChartComponent from "../../../demo/chart/apex-chart/apex-chart.component";
import {CardModule} from "../../../theme/shared/components";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";
import {ChartsModule} from "../../../core/shared/components/charts/charts.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

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
    ApexChartComponent,
    ChartsModule,
    NgxDatatableModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu
  ]
})
export class HomeModule {
}
