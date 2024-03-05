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
  {
    path: 'tips',
    loadChildren: () => import('./tips/tips.module').then(
      (m) => m.TipsModule
    )
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(
      (m) => m.AboutUsModule
    )
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then(
      (m) => m.ReviewsModule
    )
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(
      (m) => m.ManagementModule
    )
  },
  {
    path: 'recommended-meals',
    loadChildren: () => import('./recommended-meals/recommended-meals.module').then(
      (m) => m.RecommendedMealsModule
    )
  },
  {
    path: 'training-video',
    loadChildren: () => import('./training-video/training-video.module').then(
      (m) => m.TrainingVideoModule
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
