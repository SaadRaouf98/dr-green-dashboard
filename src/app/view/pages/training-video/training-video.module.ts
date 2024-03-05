import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {TrainingVideoComponent} from "./components/training-video/training-video.component";


const routes: Routes = [
  {
    path: '',
    component: TrainingVideoComponent
  },

]

@NgModule({
  declarations: [
    TrainingVideoComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class TrainingVideoModule {
}
