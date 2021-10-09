import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModalPageRoutingModule } from './shared-modal-routing.module';

import { SharedModalPage } from './shared-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModalPageRoutingModule
  ],
  declarations: [SharedModalPage]
})
export class SharedModalPageModule {}
