import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {ReviewsComponent} from "./components/reviews/reviews.component";


const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent
  },
]

@NgModule({
  declarations: [
    ReviewsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class ReviewsModule {
}
