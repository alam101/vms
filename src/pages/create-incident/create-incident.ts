import { Component } from '@angular/core';
import { NavController,IonicPage,MenuController,AlertController,Platform } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
@IonicPage()
@Component({
  selector: 'page-create-incident',
  templateUrl: 'create-incident.html',
})
export class CreateIncidentPage {
  incident:any="";
  prefix:string;
  description:string="";
  definedLength:number=this.global.definedLength;
  filtered:any=[];
  issueTypes:any=[];
  filldropdown:string;
  isOpen:boolean=false;
  constructor(private platform:Platform,public alertCtrl: AlertController,private menu:MenuController,public global:GlobalProvider,public navCtrl: NavController) {
    global.title="Create Incident";
    this.prefix=global.createIncidentPrefix;
    this.getIssues();
  }
// disable swipper menu on this page
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  
  //input text lengthshould be less than or equals to given length(150)
  blockInput(){
    if(this.description.length>this.global.inputLength){
      return false;
    }
  }
  //Validate the input length into textarea
  validateLength(event){
    this.description=this.global.validateLength(event);
  }
  //Pull the all issues from JSON 
  getIssues(){
      this.global.readSMSDetail().then(res=>{
        
        var data=JSON.parse(JSON.parse(JSON.stringify(res))._body)[0];
        for(var i in data.createIncident)
        {
            this.issueTypes.push(data.createIncident[i].issueType);
        }
        console.log("json",this.issueTypes);
         this.issueTypes.sort();
       
      });
  }
  
  // filter  issue from all Issues 
  getIssueType(name){
    
    this.description="";
    this.global.readSMSDetail().then(res=>{
      let filterArray=[];
      filterArray.push(name); 
      var data=JSON.parse(JSON.parse(JSON.stringify(res))._body)[0];
      this.filtered = data.createIncident.filter(function(item) {
        console.log("item",item);
      return filterArray.indexOf(item.issueType) !== -1 ;
      });
      
      if(this.filtered.length>0){
        this.filldropdown=this.filtered[0].issueType;
       // this.incident=this.filtered[0].issueType;
        this.description=this.filtered[0].issueType;
        this.prefix=this.filtered[0].prefix+"";
       }
      
       return;
  });
  }
  //send sms
  sendSMS(){
    if(this.description.trim()==""){
      this.global.toastMessage(this.global.descriptionMandatory);
      return;
    }
    else{
       this.global.sendSMS(this.prefix, this.description).then( (isSuccess) =>{
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
   
   }
   //redirect ot home page
   cancel(){
    this.navCtrl.setRoot("HomePage");
   }
}
