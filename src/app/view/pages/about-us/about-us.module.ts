import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {WhoWeAreComponent} from "./components/who-we-are/who-we-are.component";
import {VisionAndMissionComponent} from "./components/vision-and-mission/vision-and-mission.component";
import {OurValueComponent} from "./components/our-value/our-value.component";


const routes: Routes = [
  {
    path: 'who-we-are',
    component: WhoWeAreComponent
  },
  {
    path: 'vision-and-mission',
    component: VisionAndMissionComponent
  },
  {
    path: 'our-value',
    component: OurValueComponent
  },
]

@NgModule({
  declarations: [
    WhoWeAreComponent,
    VisionAndMissionComponent,
    OurValueComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class AboutUsModule {
}
