import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {RecommendedMealsComponent} from "./components/recommended-meals/recommended-meals.component";


const routes: Routes = [
  {
    path: '',
    component: RecommendedMealsComponent
  },

]

@NgModule({
  declarations: [
    RecommendedMealsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class RecommendedMealsModule {
}
