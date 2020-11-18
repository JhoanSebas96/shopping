import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from "@ionic/angular";
import * as firebase from "firebase";
import 'firebase/database';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  carts: Array<any> = [];
  uid: string;
  totalCost: number = 0;

  constructor(public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    this.uid = localStorage.getItem("uid");
    this.carts = JSON.parse(localStorage.getItem("carts"));

    this.carts.forEach(cart => {
      let price: string = cart.price;
      this.totalCost = Number(price) + this.totalCost;
    })
  }

  ngOnInit() {
  }

  placeOrder() {
    this.carts.forEach(cart => {
      firebase.firestore().collection("orders").doc(this.uid).collection("products").add(cart);
    });

    localStorage.setItem("carts", JSON.stringify([]));

    this.modalCtrl.dismiss();
  }
}
