import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepaymentPageRoutingModule } from './repayment-routing.module';

import { RepaymentPage } from './repayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RepaymentPageRoutingModule
  ],
  declarations: [RepaymentPage]
})
export class RepaymentPageModule {}
