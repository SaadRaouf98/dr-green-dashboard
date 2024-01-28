import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdsListComponent} from './components/ads-list/ads-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {AddAdsComponent} from "./components/add-ads/add-ads.component";

const routes: Routes = [
  {
    path: '',
    component: AdsListComponent
  },
  {
    path: 'add',
    component: AddAdsComponent
  },
  {
    path: 'edit',
    component: AdsListComponent
  }
]

@NgModule({
  declarations: [
    AdsListComponent,
    AddAdsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class AdsModule {
}
