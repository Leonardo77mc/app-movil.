import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {

    // url of the service.
    apiUrl = 'https://allinapp.com.co/Acciones/servicesMovil/';
    constructor(public http: HttpClient) {

    }

    verificarBrazosDirectos(id){
    
        const params = new FormData();
        params.append('idUsuario', id);
        return this.http.post(this.apiUrl + 'brazosPrincipales.php', params);
    }

    // add users.
    addUserRed(user, id){
        //console.log("id en el servicio " +id);
        const dateTime = new Date();
        let hora:any = dateTime.getHours();
        let minutos:any = dateTime.getMinutes();
        let segundos:any = dateTime.getSeconds();
        hora = hora + ":" + minutos + ":" + segundos;
        const params = new FormData();
        params.append('hora', hora);
        params.append('idUser', id);
        params.append('email', user.email);
        params.append('usuario', user.usuario);
        params.append('password', user.password);
        params.append('genero', user.genero);
        params.append('nombre', user.nombre);
        params.append('primerApellido', user.primerApellido);
        params.append('segundoApellido', user.segundoApellido);
        params.append('tipoDocument', user.tipoDocument);
        params.append('cedula', user.cedula);
        params.append('fnacimiento', user.fnacimiento);
        params.append('telefono', user.telefono);
        params.append('direccion', user.direccion);
        params.append('departamento', user.departamento);
        params.append('ciudad', user.ciudad);
        params.append('brazo', user.brazo);
        params.append('cedulaBeneficiario', user.cedulaBeneficiario);
        params.append('emailValidate', user.emailValidate);
        return this.http.post(this.apiUrl + 'addUserMovil.php', params);
    }

}
