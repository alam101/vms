import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovalRequestPage } from './approval-request';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    ApprovalRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ApprovalRequestPage),
    ComponentsModule

  ],
  exports: [
    ApprovalRequestPage
  ]
})
export class ApprovalRequestPageModule {}
