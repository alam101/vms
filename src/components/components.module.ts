import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';


@NgModule({
  imports: [IonicModule],
  exports: [HeaderComponent,
    FooterComponent],
  declarations: [HeaderComponent,
    FooterComponent],
  providers: [],
})

export class ComponentsModule {}
