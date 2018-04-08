import { Injectable } from '@angular/core';
import { AlertController,ToastController, Platform} from 'ionic-angular';
import { Http } from '@angular/http';
import  'rxjs';
import { SMS } from '@ionic-native/sms';
// declare var SMS:any;
@Injectable()
export class GlobalProvider {

  url:string="./assets/JSON/";
  
  title:string="Home";
  inputLength:number=149;
  //maxCharect:number=150;
  createIncidentPrefix:string="INC";
  successMessage:string="Request submitted successfully";
  requestFailed:string = "Request failed";
  failedMessage:string = this.requestFailed;
  
  mandatory:string="Request # is mandatory";
  resetMandatory:string="Domain ID is mandatory";
  
  //has android permission
  hasPermission:boolean = false;

  //provide app permission
  providePermission:string = "This app requires permission to access SMS services. Please update app permissions via Settings > Apps > Econnect > Permissions. Allow SMS and Calls.";

  //Mandatory message 
  descriptionMandatory:string="Description is mandatory";

  //SMS receiver Info
  smsReceiverNo:string = "56565";

  //Message for app not available.
  appNotAvailable:string = "This app is currently not installed on your device. Would you like to download it now?";

  definedLength:number=150;
  deviceDetails:any = null;
  validateInputValue:string;
  specialCharacterValidate:RegExp=/[~`!#$%^()_={}[\]:;<>+\?-]/;
  imojiCharacter:RegExp=/^[A-z&#209;&#241;0-9,.@&/ ]*$/i;
  imojiReplace:RegExp=/[^A-z&#209;&#241;0-9,.@&/ ]/ig;

  IOSAppId:Object =  {
    MSAFE : { id: "mSafe", url: "https://m-safe.vodafone.in:8443/VodafoneKrccClientIntegration/pages/download/downloads.html"},
    CXO : { id: "com.ibm.cogmob.artoo", url: "https://itunes.apple.com/in/app/ibm-cognos-mobile/id455326089?mt=8"},
    EVO : { id: "evoneptune", url: "https://sup.evo.vodafone.com"}
  };
 

  //Define device Id 
  AndroidAppId:Object =  {
    MSAFE : { id: "com.mobicule.vodafone.client", url: "https://m-safe.vodafone.in:8443/VodafoneKrccClientIntegration/pages/download/downloads.html"},
    CXO : { id: "com.ibm.cogmob.artoo", url: "https://play.google.com/store/apps/details?id=com.ibm.cogmob.artoo"},
    EVO : { id: "com.vodafone.EvoMobileClient", url: "https://sup.evo.vodafone.com"}
  };
  

  PlatformType:Object = {
    Android :  "android",
    IOS : "ios"
  }// 
  constructor(public http: Http,private smsVar:SMS,public alertCtrl: AlertController, public toast:ToastController, public platform: Platform,) {
    console.log('Hello GlobalProvider Provider');
  }
  //mandatory field validation manage using toast 
  toastMessage(messageTxt){
    const toast=this.toast.create({message:messageTxt,duration:3000});
    toast.present();
  }
  // this fucntion read all JSON data and filter as per required
  readSMSDetail() {
    return this.http.get(this.url+`smsDetail.json`)
      .toPromise()
      .then((response) => {
        return response;
      }).catch((err) => {
      console.log(err);
    });
  }
  //open external app if available
  openApp(appId, appType, appURL){
    var vm:any = this;
    var launchString:Object = (appType == 'ios') ? {uri: appId + "://"} : {packageName:appId};
    window['plugins'].launcher.launch(launchString, function(data){
    }, function(err){
        vm.showConfirm("Alert", vm.appNotAvailable, function(){
            window.open(appURL, '_self', 'location=yes');
        }, function(){
        });
         
    });
  }


  sendSMS(prefix,requestData){
    let promise = new Promise((resolve, reject) => {
    var vm:any = this;
     vm.failedMessage = vm.requestFailed;
      vm.checkPermission('CALL',function(callStatus){
      if(callStatus){
         vm.checkPermission('SMS',function(smsStatus){
          if(smsStatus){
            try{
              vm.smsVar.send( vm.smsReceiverNo, prefix+' '+requestData);
              resolve(true);
             }catch(e){
                vm.failedMessage = vm.providePermission;
                resolve(false);
            }
          }
          else{
            vm.failedMessage = vm.providePermission;
            resolve(false);
          }          
        });
      }
      else{
        vm.failedMessage = vm.providePermission;
        resolve(false);      
      }
  
    });
  });
  return promise;
    
  } 
    
//send sms plugin configured 
// sendSMSOLD(prefix,requestData, callback:(any) => void){
  
//   var vm:any = this;
//    vm.failedMessage = vm.requestFailed;
//     vm.checkPermission('CALL',function(callStatus){
//     if(callStatus){
//        vm.checkPermission('SMS',function(smsStatus){
//         if(smsStatus){
//           try{
//             vm.smsVar.send( vm.smsReceiverNo, prefix+' '+requestData);
//               callback(true);
//            }catch(e){
//               vm.failedMessage = vm.providePermission;
//               callback(false);
//           }
//         }
//         else{
//           vm.failedMessage = vm.providePermission;
//           callback(false);
//         }          
//       });
//     }
//     else{
//       vm.failedMessage = vm.providePermission;
//       callback(false);      
//     }

//   });
  
// }
checkPermission(permissonType, success:(any) => void){
  var vm:any = this;   
  permissonType = (permissonType == "CALL") ? 'android.permission.READ_PHONE_STATE' : 'android.permission.SEND_SMS';
  if(this.platform.is('android')){
    window["cordova"].exec(function(status){
        success(status.hasPermission);
    }, function(err){
        success(false);
    }, "Permissions", 'checkPermission', [permissonType]);
  }
  else{
    success(true);    
  }
}
askPermissions(){
  var vm:any = this;  
  if(this.platform.is('android')){
    window["cordova"].exec(function(status){
        vm.hasPermission = status.hasPermission;
    }, function(err){
        // do nothing 
    }, "Permissions", 'requestPermissions', ['android.permission.READ_PHONE_STATE', 'android.permission.SEND_SMS' ]);
  }
  else{
    this.hasPermission = true;
  }
}

//when open external app this confirm popup will take permission first
showConfirm(title, message, success:(any) => void, cancel:(any) => void){
  let alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [
      {
        text: 'CANCEL',
        role: 'cancel',
        handler: (data) => {
          console.log('Cancel clicked');
          cancel(data);
        }
      },
      {
        text: 'OK',
        handler: (data) => {
          console.log('success clicked');
          success(data);
        }
      }
    ]
  });
  alert.present();
}
//after sms successfully transfer to sms window alter will show failed/ success
showMessage(message, ok:(any)=>void) {
  let alert = this.alertCtrl.create({
    message: message, 
    buttons: [{
      text: 'OK',
      role: 'cancel',
      handler: () => {
        ok("HomePage");
      }
    }]
  });
  alert.present();
}
//validate create incident and approve request module
validateLength(event) {
  const element = event.target as HTMLInputElement;
  const value = element.value;
  //console.log(/^[ a-zA-Z0-9]+$/.test(element.value));
  if (value.length <= this.definedLength) {
    if(this.specialCharacterValidate.test(element.value)){
      element.value = value.substr(0, element.value.length - 1);
    }
      !(this.imojiCharacter).test(element.value)?element.value = element.value.replace(this.imojiReplace,''):'';

   
  } else {
    element.value = value.substr(0, this.definedLength);
  }

  return element.value;

}
//validate domain ID for reset password and unloack domain
validateDomain(event) {
  const element = event.target as HTMLInputElement;
  const value = element.value;
  if (value.length <= this.definedLength) { // if valida
    //  !(this.imojiCharacter).test(element.value)?element.value = element.value.replace(this.imojiReplace,''):'';
  } else {
    element.value = value.substr(0, this.definedLength);
  }

  return element.value;

}
}


