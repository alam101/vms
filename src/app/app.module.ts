import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp,IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { SMS } from '@ionic-native/sms';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { AppAvailability } from 'ionic-native';
import { WebIntent } from '@ionic-native/web-intent';
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
     IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    LaunchNavigator,
    AppAvailability, 
    WebIntent,
    GlobalProvider
  ]
})
export class AppModule {}
