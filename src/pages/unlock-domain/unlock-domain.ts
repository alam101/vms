import { Component} from '@angular/core';
import { NavController,IonicPage,MenuController,AlertController,Platform } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
@IonicPage()
@Component({
  selector: 'page-unlock-domain',
  templateUrl: 'unlock-domain.html',
})
export class UnlockDomainPage {
  domainId:string="";
  prefix:string;
  constructor(private platform:Platform,public alertCtrl: AlertController,public global:GlobalProvider,private menu:MenuController,public navCtrl: NavController) {
    this.getIssues();
  }
  //validate input length for unloack domain
  validateLength(event){
    this.domainId=this.global.validateDomain(event);
  
  }
  //this function used to get prefix for unloack domain
  getIssues(){
    this.global.readSMSDetail().then(res=>{
      var data=JSON.parse(JSON.parse(JSON.stringify(res))._body)[3];
      console.log(JSON.stringify(data));
     this.prefix=data.unlockDomain[0].prefix;
    });
}

//send sms for unloack domain
sendSMS(){
  if(this.domainId.trim().length>0){
     this.global.sendSMS(this.prefix, this.domainId).then( (isSuccess) =>{
      if(isSuccess){
        if(this.platform.is('android')){
          this.global.showMessage(this.global.successMessage,(res)=>{
            this.navCtrl.setRoot(res);
          });
        }
        else{
          this.navCtrl.setRoot("HomePage");
        }
      }
      else{
        this.global.showMessage(this.global.failedMessage,(res)=>{});
      }
    });
  }
  else{
    this.global.toastMessage(this.global.resetMandatory);
  }
 }
 //return back to hopage
 cancel(){
   this.navCtrl.setRoot("HomePage");
 }
 //Disable swiping of menu
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

  }

}
