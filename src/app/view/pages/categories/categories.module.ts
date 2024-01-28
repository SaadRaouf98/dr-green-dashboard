import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {AddCategoriesComponent} from "./components/add-categories/add-categories.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent
  },
  {
    path: 'add',
    component: AddCategoriesComponent
  },
  {
    path: 'edit',
    component: CategoriesListComponent
  }
]

@NgModule({
  declarations: [
    CategoriesListComponent,
    AddCategoriesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class CategoriesModule {
}
