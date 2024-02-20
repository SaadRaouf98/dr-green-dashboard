import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {WhoWeAreComponent} from "./components/who-we-are/who-we-are.component";


const routes: Routes = [
  {
    path: 'who-we-are',
    component: WhoWeAreComponent
  },
]

@NgModule({
  declarations: [
    WhoWeAreComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class AboutUsModule {
}
