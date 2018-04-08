import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,IonicPage,Content } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html'
})
export class FaqsPage{
  @ViewChild(Content) content: Content;
  section:number=0;
  faqs:any=[];
  scrollAm:number=200;
  scrollT:number;
  constructor(private global:GlobalProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.FAQs();
  }
  //toggle Option open and cloe
  toggleOption(flag,$event){
    var cent:any = this.global.deviceDetails.height;
    var pos:any = $event.target.offsetTop - cent;
    var scrollVal:any = pos + (450);
    this.content.scrollTo(0,scrollVal, 750);
   
    if(this.section!=0 && this.section!=flag){
      this.section=flag;
      return;
    }
    this.section==0?this.section=flag:this.section=0;
  
  }
  //Get list of questions and answers 
  FAQs(){
    this.global.readSMSDetail().then(res=>{
      this.faqs=JSON.parse(JSON.parse(JSON.stringify(res))._body)[4].FAQs;
   });
  }
  
}
