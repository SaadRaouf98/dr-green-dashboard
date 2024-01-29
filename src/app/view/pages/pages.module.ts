import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(
      (m) => m.CategoriesModule
    )
  },
  {
    path: 'ads',
    loadChildren: () => import('./ads/ads.module').then(
      (m) => m.AdsModule
    )
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PagesModule { }
