import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams, IonicPage} from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage{
  x:any=0;
  devicePlatform:String = "";
  constructor(public global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    global.title="Home"
    this.x=1;
    this.devicePlatform = platform.is('ios') ? 'ios' : 'android';
  }
  //Redirect to create Incident page
  createIncident(id){
    setTimeout(()=>{this.navCtrl.push("CreateIncidentPage",{});},500); 
  }
  //redirect to approve Request page
  approveRequest(){
    setTimeout(()=>{this.navCtrl.push("ApprovalRequestPage");},500);
  }
  //Redirect to Reset Password page 
  resetPassword(){
    setTimeout(()=>{this.navCtrl.push("ResetPasswordPage");},500);
  }
  //redirect to Uloloack DOmain Page
  unlockDomain(){
    setTimeout(()=>{this.navCtrl.push("UnlockDomainPage");},500);
  }
  //open mSafe app
  mSafe(){
    var appId:String = (this.devicePlatform == this.global.PlatformType["IOS"]) ? this.global.IOSAppId["MSAFE"].id : this.global.AndroidAppId["MSAFE"].id;
    var appUrl:String = (this.devicePlatform == this.global.PlatformType["IOS"]) ? this.global.IOSAppId["MSAFE"].url : this.global.AndroidAppId["MSAFE"].url;
     
    this.global.openApp(appId, this.devicePlatform, appUrl);
  }
  //open CXO app
  CXO(){
    var appId:String = (this.devicePlatform == this.global.PlatformType["IOS"]) ? this.global.IOSAppId["CXO"].id : this.global.AndroidAppId["CXO"].id;
    var appUrl:String = (this.devicePlatform == this.global.PlatformType["IOS"]) ? this.global.IOSAppId["CXO"].url : this.global.AndroidAppId["CXO"].url;
    
    this.global.openApp(appId, this.devicePlatform, appUrl);
  }
  //open EVO app
  EVO(){
    var appId:String = (this.devicePlatform == this.global.PlatformType["IOS"]) ? this.global.IOSAppId["EVO"].id : this.global.AndroidAppId["EVO"].id;
    var appUrl:String = (this.devicePlatform == this.global.PlatformType["IOS"]) ? this.global.IOSAppId["EVO"].url : this.global.AndroidAppId["EVO"].url;
    
    this.global.openApp(appId, this.devicePlatform, appUrl);
  }
  
}
