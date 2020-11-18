import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  categories: Array<any> = [
    {
      title: "Periféricos",
      name: "perifericos",
      icon: "game-controller-outline",
      color: "dark"
    },
    {
      title: "Componentes",
      name: "componentes",
      icon: "hardware-chip-outline",
      color: "dark"
    }
    ,
    {
      title: "Portátiles",
      name: "portatiles",
      icon: "laptop-outline",
      color: "dark"
    },
    {
      title: "Monitores",
      name: "monitores",
      icon: "desktop-outline",
      color: "dark"
    }
  ]
  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  exploreCategory(title) {
    sessionStorage.setItem("categoryName", title);
    this.nav.navigateForward("/category");
  }

}
