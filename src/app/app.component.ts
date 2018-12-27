import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

    rootPage: any;
    rootPage2: any = 'ProductosPage';
    rootPage3: any = 'InvoicesPage';
    rootPage4: any = 'MapaPage';

    public usuarioUser: any = [];

    // Menu Home.
    iconosHome:Array<any> = ['photos', 'book', 'map', 'contact'];
    pagesHome: Array<any> =[
        { titulo: 'Explora nuestra tienda', componente: 'ProductosPage', icono: this.iconosHome[0]},
        { titulo: 'Registrate', componente: 'UnetePage', icono: this.iconosHome[1]},
        { titulo: 'Contactanos', componente: 'MapaPage', icono: this.iconosHome[2]},
        { titulo: 'Inicia sesion', componente: 'HomePage', icono: this.iconosHome[3]}
    ];

    // Menu User.
    iconosUser:Array<any> = ['photos', 'book'];
    pagesUser: Array<any> =[
        { titulo: 'Facturas', componente: 'InvoicePage', icono: this.iconosUser[0]},
        { titulo: 'Cerrar sesion', componente: 'HomePage', icono: this.iconosUser[1]},
    ];
  public b;
  constructor(platform: Platform,
              statusBar: StatusBar,
              private modal: ModalController,
              splashScreen: SplashScreen){
    platform.ready().then(() => {

                 this.usuarioUser = JSON.parse(localStorage.getItem('datosUsuario'));
                //console.log("appComponet:" + this.usuarioUser);
              //  console.log(localStorage.getItem('introduccion'));
                if(localStorage.getItem('introduccion') != null){
                    this.iniciar();
                }else{
                    this.rootPage = 'IntroduccionPage';
                }

        statusBar.backgroundColorByHexString('#ef5350');
        splashScreen.hide();

    });

  }

    iniciar():void{

        if(this.usuarioUser != null){
            //this.usuarioUser.user != null? this.rootPage = ModuloUserPage : this.rootPage = HomePage;
            this.rootPage = 'page-tabs';
        }else{
            this.rootPage = 'HomePage';
        }

    }

    openPage(page){

        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.modal.create(page.componente).present();
    }

}
