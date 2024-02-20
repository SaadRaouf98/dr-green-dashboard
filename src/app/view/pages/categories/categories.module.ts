import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent
  },
]

@NgModule({
  declarations: [
    CategoriesListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class CategoriesModule {
}
