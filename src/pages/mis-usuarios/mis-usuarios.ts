import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";

@IonicPage()
@Component({
    selector: 'mis-usuarios',
    templateUrl: 'mis-usuarios.html',
})
export class MisUsuariosPage{

    usuariosArbol:any = [];
    public idUsuario;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modal: ModalController,
                public servicioUser: ServiceProvider) {

    }

    ionViewWillEnter(){
        this.idUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
        this.setUsuarios(this.idUsuario.id);
    }

    setUsuarios(idUsuario) {
        this.servicioUser.getUsuariosArbol(idUsuario)
            .then(data => {
                this.usuariosArbol = data;
                console.log(this.usuariosArbol);
            });
    }

}
