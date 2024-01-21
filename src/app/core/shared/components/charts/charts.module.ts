import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadialBarsComponent } from './radial-bars/radial-bars.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {RouterModule, Routes} from "@angular/router";
import { LineComponent } from './line/line.component';

  const routes: Routes =[
    {
      path: 'radial-bars-chart',
      component: RadialBarsComponent
    },
    {
      path: 'line-chart',
      component: LineComponent
    },
  ]

@NgModule({
  declarations: [
    RadialBarsComponent,
    LineComponent
  ],
  exports: [
    RadialBarsComponent,
    LineComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgApexchartsModule,
  ]
})
export class ChartsModule { }
