import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeViewComponent} from './components/home-view/home-view.component';
import {RouterModule, Routes} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";
import ApexChartComponent from "../../../demo/chart/apex-chart/apex-chart.component";
import {CardModule} from "../../../theme/shared/components";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";
import {ChartsModule} from "../../../core/shared/components/charts/charts.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../theme/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  }
]

@NgModule({
  declarations: [
    HomeViewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgApexchartsModule,
    ApexChartComponent,
    NgbProgressbar,
    ChartsModule,
    NgxDatatableModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    SharedModule
  ]
})
export class HomeModule {
}
