import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnlockDomainPage } from './unlock-domain';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    UnlockDomainPage,
  ],
  imports: [
    IonicPageModule.forChild(UnlockDomainPage),
    ComponentsModule

  ],
  exports: [
    UnlockDomainPage
  ]
})
export class UnlockDomainPageModule {}
