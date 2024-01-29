import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeViewComponent} from './components/home-view/home-view.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../theme/shared/shared.module";

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
    SharedModule
  ]
})
export class HomeModule {
}
