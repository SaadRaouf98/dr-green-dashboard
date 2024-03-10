import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {RouterModule, Routes} from "@angular/router";
import {AddEmployeesComponent} from "./components/add-employees/add-employees.component";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../../../theme/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent
  },
  {
    path: 'add',
    component: AddEmployeesComponent
  },
  {
    path: 'edit/:id',
    component: AddEmployeesComponent
  }
]

@NgModule({
  declarations: [
    EmployeesListComponent,
    AddEmployeesComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        TranslateModule
    ]
})
export class EmployeesModule {
}
