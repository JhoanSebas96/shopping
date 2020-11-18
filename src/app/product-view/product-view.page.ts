import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import 'firebase/database';
import { NavController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

  

  productId: string;
  productName: string;
  productImg: string;
  productPrice: string;
  productCompany: string;
  productCategory: string;
  cartText: string;

  segment: string = "relatedProducts";

  related: Array<any> = [];
  from: Array<any> = [];

  constructor(public nav: NavController, public alertCtrl: AlertController) {
    
    this.productId = sessionStorage.getItem("productId");
    this.productName = sessionStorage.getItem("productName");
    this.productImg = sessionStorage.getItem("productImg");
    this.productPrice = sessionStorage.getItem("productPrice");
    this.productCompany = sessionStorage.getItem("productCompany");
    this.productCategory = sessionStorage.getItem("productCategory");

    if (localStorage.getItem("carts")) {
      let carts: Array<any> = JSON.parse(localStorage.getItem("carts"));
      let index = carts.findIndex(x => x.id == this.productId);
      if (index == -1) {
        this.cartText = "Agregar al Carrito";
      }
      else {
        this.cartText = "Agregado";
      }
    }
    else {
      this.cartText = "Agregar al Carrito";
    }

    
    firebase.firestore().collection("products").where("category","==", this.productCategory).limit(10).onSnapshot(snap =>{
      snap.forEach((doc) =>{
        if (doc.id != this.productId) {
          this.related.push({ id: doc.id, ...doc.data()});
        }
      })
    })

  }

  ngOnInit() {
  }

  changeSeg() {
    if (this.segment == "fromCompany") {
      if (this.from.length == 0) {
        
        firebase.firestore().collection("products").where("company","==", this.productCompany).limit(10).onSnapshot(snap =>{
          snap.forEach(doc =>{
            if (doc.id != this.productId) {
              this.from.push({id: doc.id, ...doc.data()});
            }
          });
        });
      }
    }
  }

  viewProduct(id, name, img, price, company, category) {
    sessionStorage.setItem("productId", id);
    sessionStorage.setItem("productName", name);
    sessionStorage.setItem("productImg", img);
    sessionStorage.setItem("productPrice", price);
    sessionStorage.setItem("productCompany", company);
    sessionStorage.setItem("productCategory", category);
    this.nav.navigateForward("/product-view/" + id);
  }

  addToCart() {
    let carts: Array<any> = [];
    if (localStorage.getItem("carts")) {
      carts = JSON.parse(localStorage.getItem("carts"));

      let index = carts.findIndex(x => x.id == this.productId);
      if (index == -1) {
        this.cartText = "Agregado";
        var obj = {
          id: this.productId,
          name: this.productName,
          img: this.productImg,
          price: this.productPrice,
          company: this.productCompany,
          category: this.productCategory,
        }

        carts.push(obj);
      }
      else {
        carts.splice(index, 1);
        this.cartText = "Agregar al Carrito";
      }
    }
    else {
      this.cartText = "Agregado";
      var obj = {
        id: this.productId,
        name: this.productName,
        img: this.productImg,
        price: this.productPrice,
        company: this.productCompany,
        category: this.productCategory,
      }

      carts.push(obj);
    }

    localStorage.setItem("carts", JSON.stringify(carts));
  }
}
