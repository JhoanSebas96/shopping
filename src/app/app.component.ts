import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public nav: NavController,
  ) {
    this.initializeApp();
    
    const firebaseConfig = {
      apiKey: "AIzaSyDnd7XmiG3h268aufew89Nrl2Hu0DSrPT4",
      authDomain: "baseshop-96e56.firebaseapp.com",
      databaseURL: "https://baseshop-96e56.firebaseio.com",
      projectId: "baseshop-96e56",
      storageBucket: "baseshop-96e56.appspot.com",
      messagingSenderId: "46336553006",
      appId: "1:46336553006:web:c263f4312589ba3b30efbf"
    };
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkUser(){
    if(localStorage.getItem("uid")){
      this.nav.navigateRoot("/");
    }
    else{
      this.nav.navigateRoot("/login");
    }
  }
}
