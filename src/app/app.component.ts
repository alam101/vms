import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider} from '../providers/global/global';
//import {BMSClient,BMSPush} from 'bms-push'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:string = "LoginPage";
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl:MenuController, public global:GlobalProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need..
     // statusBar.styleDefault();
      statusBar.styleLightContent(); 
      splashScreen.hide();

      this.global.deviceDetails = { width : platform.width(), height : platform.height()};

      this.global.askPermissions();
      if (window["cordova"] && window["cordova"].plugins.Keyboard) {
          window["cordova"].plugins.Keyboard.hideKeyboardAccessoryBar(false);
          window["cordova"].plugins.Keyboard.disableScroll(true);
      } 


     //////////////////push notification



    });
  }
  
  
  closeMenu() {
    this.menuCtrl.close();
  }
  createIncident(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.push("CreateIncidentPage");
    },500);
    
  }
  approvalRequest(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.push("ApprovalRequestPage");
    },500);
    
  }
  unlockDomain(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.push("UnlockDomainPage");
    },500);
   
  }
  resetPassword(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.push("ResetPasswordPage");
    },500);
   
  }
  Home(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.setRoot("HomePage");
    },500);
   
  }
  Faqs(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.push("FaqsPage");
    },500);
    
  }
  logout(){
    setTimeout(()=>{
      this.closeMenu();
      this.nav.setRoot("LoginPage");
    },500);
    
  }
}
