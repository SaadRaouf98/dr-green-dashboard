import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdsComponent} from './ads.component';
import {RouterModule, Routes} from "@angular/router";
import {CardModule} from "../../../theme/shared/components";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../theme/shared/shared.module";

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
    CommonModule,
    SharedModule
  ]
})
export class AdsModule {
}
