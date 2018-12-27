import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, LoadingController } from 'ionic-angular';
//import { AppMinimize } from '@ionic-native/app-minimize';


@IonicPage({name:'page-tabs'})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root = 'ModuloUserPage';
    tab2Root = 'RegistrarPage';
    tab3Root = 'MisUsuariosPage';
    tab4Root = 'StorePage';
    tabPage:any;

    constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modal: ModalController,
              public menu:MenuController,
              //private platform : Platform,
              //private view : ViewController,
              private loadin : LoadingController,
              //private appMinimize: AppMinimize
            ){

              this.menuUser();
                    
  }

  ionViewDidEnter(){
            this.tabPage = this.iniciarlizar();       
  }

  iniciarlizar(){
    localStorage.setItem('tabPage', 'true');
    let tabPage = localStorage.getItem('tabPage');
    return tabPage;
  }

  loging() {
    this.loadin.create({
        spinner: 'bubbles',
        content: `Cargando...`,
        duration:1400
    }).present();
}

/*
  ionViewWillEnter(){

      this.tabPage =  this.iniciarlizar();
      console.log(this.tabPage);
       //Registration of push in Android and Windows Phone
        this.platform.registerBackButtonAction(() => {

            if (true){ //Can we go back?
                    this.view.dismiss();
                    //this.mensaje(`tabPage es ${localStorage.getItem('tabPage')}`);
              }else{
                    //this.appMinimize.minimize();//Minimize from app
                    //this.mensaje(`tabPage no es true, pero si es ${localStorage.getItem('tabPage')}`);
              }                      
                 });
  }

  */

    mensaje(current){
        this.loadin.create({
            spinner:'hide',
            content: `<h4>${current}</h4>`,
            duration:2000
        }).present();
    }

    // function for begin search.
    beginSearch(){
        this.modal.create('SearchPage').present();
        console.log("open search");
    }

    openCart(){
        this.navCtrl.push('CarritoPage');
    }

    menuUser(){
        this.menu.enable(false, 'menuHome');
        this.menu.enable(true, 'menuUser');
    }

    


}
