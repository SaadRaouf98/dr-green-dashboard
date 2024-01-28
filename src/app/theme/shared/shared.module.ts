import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, CardModule } from './components';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpinnerComponent } from './components/spinner/spinner.component';
// bootstrap import
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModule, NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgApexchartsModule} from "ng-apexcharts";
import {ChartsModule} from "../../core/shared/components/charts/charts.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    NgbModule,
    NgScrollbarModule,
    NgSelectModule,
    NgApexchartsModule,
    NgbProgressbar,
    ChartsModule,
    NgxDatatableModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    SpinnerComponent,
    NgbModule,
    NgScrollbarModule,
    NgSelectModule,
    NgApexchartsModule,
    NgbProgressbar,
    ChartsModule,
    NgxDatatableModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,

  ],
})
export class SharedModule {}
