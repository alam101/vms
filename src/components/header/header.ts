import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent{
  title:string;
  constructor(public global:GlobalProvider,public navCtrl: NavController){    
   this.title= global.title;
  }

}
