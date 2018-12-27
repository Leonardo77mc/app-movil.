import {Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Nav, MenuController } from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage{

    public users:any;
    public datosLogin:any =[];
    public mensaje:string;
    constructor(public navCtrl: NavController,
                public servicioMovil: ServiceProvider,
                public login: LoadingController,
                public nav: Nav,
                public menu: MenuController){

        this.users = {
            usuario : "",
            clave : ""
        }
        this.menuHome();
    }

    menuHome(){
        this.menu.enable(true, 'menuHome');
        this.menu.enable(false, 'menuUser');
    }

    submitServiceLogin(){
        this.servicioMovil.loginPost(this.users).subscribe(
            (data) =>{
                this.datosLogin = data;
                this.validateLogin();
            },
            (error) =>{
                this.mensaje = "Hubo un error en la peticion";
                this.showAlertPetition(this.mensaje);
            }
        )
    }

    /*
    submitServiceLogin(){

      submitServiceLogin(){
              this.servicioMovil.submitLogin(this.users)
                  .then(data => {
                      this.datosLogin = data;
                      this.validateLogin();
                  });
          }
  */

    validateLogin(){
        if(this.datosLogin.user != null){
            localStorage.setItem('datosUsuario', JSON.stringify(this.datosLogin));
            this.nav.setRoot('page-tabs');
            //this.navCtrl.push(ModuloUserPage);
        }else{
            this.showAlert();
        }
    }

    showAlertPetition(mensaje) {
        this.login.create({
            spinner: 'hide',
            content: `
              <div class="custom-spinner-container">
                <div class="custom-spinner-box">${mensaje}</div>
              </div>`,
            enableBackdropDismiss:true
        }).present();
    }

    showAlert() {
        this.login.create({
            spinner: 'hide',
            content: `
              <div class="custom-spinner-container">
                <div class="custom-spinner-box">${this.datosLogin.mensaje}</div>
              </div>`,
            enableBackdropDismiss:true
        }).present();
    }

   

}
