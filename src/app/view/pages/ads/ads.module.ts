import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdsComponent} from './ads.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AdsComponent
  }
]

@NgModule({
  declarations: [
    AdsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AdsModule {
}
