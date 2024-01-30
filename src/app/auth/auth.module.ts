import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "./auth.service";
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../theme/shared/shared.module";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule
    ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {
}
