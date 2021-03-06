import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from "@ionic/angular";
import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/database';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  products: Array<any> = [];
  lastKey: string = null;

  constructor(public nav: NavController,) {
    firebase.firestore().collection("products").orderBy("category").limit(30).onSnapshot(snap => {
      snap.forEach((doc) =>{
        this.lastKey = doc.id;
        console.log(doc.id, "=>", doc.data());
        this.products.push({ id: doc.id, ...doc.data()})
        
      })
    })
  }

  loadData(event) {
    
    firebase.database().ref("baseshop-96e56/").orderByKey().limitToFirst(50).once("value", snap => {
      event.target.complete();
      console.log(firebase.database)

      if (snap.numChildren() == 1) {
        this.infiniteScroll.disabled = true;
        console.log('end')
      }
      else {
        snap.forEach(childSnap => {

          if (this.lastKey != childSnap.key) {
            this.lastKey = childSnap.key;
            this.products.push({ id: childSnap.key, ...childSnap.val() });
          }
        })
      }
    })
  }

  viewProduct(id, name, img, price, company,category) {
    sessionStorage.setItem("productId", id);
    sessionStorage.setItem("productName", name);
    sessionStorage.setItem("productImg", img);
    sessionStorage.setItem("productPrice", price);
    sessionStorage.setItem("productCompany", company);
    sessionStorage.setItem("productCategory", category);
    this.nav.navigateForward("/product-view/" + id);
    console.log(this.viewProduct)
  }
}
