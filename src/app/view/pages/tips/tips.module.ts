import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipsListComponent} from './components/tips-list/tips-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {AddTipsComponent} from "./components/add-tips/add-tips.component";

const routes: Routes = [
  {
    path: '',
    component: TipsListComponent
  },
  {
    path: 'add',
    component: AddTipsComponent
  },
  {
    path: 'edit',
    component: TipsListComponent
  }
]

@NgModule({
  declarations: [
    TipsListComponent,
    AddTipsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class CategoriesModule {
}
