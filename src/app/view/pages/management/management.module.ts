import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {DepartmentsComponent} from "./components/departments/departments.component";


const routes: Routes = [
  {
    path: 'departments',
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
export class ManagementModule {
}
