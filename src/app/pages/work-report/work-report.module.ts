import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkReportPageRoutingModule } from './work-report-routing.module';

import { WorkReportPage } from './work-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkReportPageRoutingModule
  ],
  declarations: [WorkReportPage]
})
export class WorkReportPageModule {}
