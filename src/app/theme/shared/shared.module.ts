import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, CardModule } from './components';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpinnerComponent } from './components/spinner/spinner.component';
// bootstrap import
import {
  NgbDatepickerModule,
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbModule,
  NgbProgressbar
} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgApexchartsModule} from "ng-apexcharts";
import {ChartsModule} from "../../core/shared/components/charts/charts.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {HttpClientModule} from "@angular/common/http";
import {SharedService} from "../../core/shared/sahred-service/shared.service";
import {provideToastr, ToastrModule, ToastrService} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";


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
    HttpClientModule,
    NgbDatepickerModule,
    ToastrModule.forRoot()
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
    HttpClientModule,
    NgbDatepickerModule,
  ],
  providers: [
    // SharedService,

    // ToastrService
  ]
})
export class SharedModule {}
