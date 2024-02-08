import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import {SharedModule} from "../../../../theme/shared/shared.module";



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModalModule { }
