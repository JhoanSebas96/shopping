import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { NavController, PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  code: string = "+57";
  spin: boolean = false;
  otpSent: boolean = false;

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;

  phoneNumber: string;

  constructor(public nav: NavController, public popoverController: PopoverController) {
    
    setInterval(() => {
      if (sessionStorage.getItem("code")) {
        this.code = sessionStorage.getItem("code");
      }
    }, 100);
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  

  sendOTP() {
    var phNo = this.code + (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    this.spin = true;

    firebase.auth().signInWithPhoneNumber(phNo, this.recaptchaVerifier).then(result => {
      this.phoneNumber = phNo;
      this.otpSent = true;
      this.confirmationResult = result;
      this.spin = false;
    }).catch(err => {
      this.spin = false;
      alert(err);
    })
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.spin = true;

    this.confirmationResult.confirm(otp).then((data) => {
      this.spin = false;
      
      localStorage.setItem("uid", data.user.uid);
      localStorage.setItem("phoneNumber", data.user.phoneNumber);


      if (data.user.displayName) {
        this.nav.navigateRoot("/");
      }
      else {
        this.nav.navigateRoot("/setup");
      }
    }).catch(err => {
      alert(err);
      this.spin = false;
    })
  }
}
