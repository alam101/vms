import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateIncidentPage } from './create-incident';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    CreateIncidentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateIncidentPage),
    ComponentsModule

  ],
  exports: [
    CreateIncidentPage
  ]
})
export class CreateIncidentPageModule {}
