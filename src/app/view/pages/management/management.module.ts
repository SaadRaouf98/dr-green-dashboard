import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";


const routes: Routes = [
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments.module').then(
      (m) => m.DepartmentsModule
    )
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(
      (m) => m.EmployeesModule
    )
  },
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class ManagementModule {
}
