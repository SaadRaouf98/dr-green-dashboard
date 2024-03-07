import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DepartmentsComponent} from "./components/departments/departments.component";
import {SharedModule} from "../../../../theme/shared/shared.module";


const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent
  },
]

@NgModule({
  declarations: [
    DepartmentsComponent,

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class DepartmentsModule {
}
