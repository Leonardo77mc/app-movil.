import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-introduccion',
    templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

    slides:any[] = [
        {
            image: "assets/imgs/intro-1.png",
        },
        {
            image: "assets/imgs/intro-2.png",
        },
        {
            image: "assets/imgs/intro-3.png",
        }
    ];

    intro4 = 'assets/imgs/intro-4.png';

    introduccion:string = "true";

    constructor(public navCtrl: NavController){

    }

    saltar_tutorial(){
        this.navCtrl.setRoot('HomePage');
        localStorage.setItem('introduccion', this.introduccion);
        //console.log("localstorage: " + localStorage.getItem('introduccion'));
    }

}
