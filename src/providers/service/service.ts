import { Injectable } from '@angular/core';
import 'rxjs/observable';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ServiceProvider {

    //api:any = "http://allinapp.com.co/Acciones/servicesMovil/";
    // apiUrl = 'https://jsonplaceholder.typicode.com';
    apiUrl = 'https://allinapp.com.co/Acciones/servicesMovil/';

    constructor(private http: HttpClient) {

    }

    // metodo para mostrar los usuarios de mi arbol.
    getUsuariosArbol(idUser) {
        let code = this.generar(7);
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + '/usuariosdemiArbol.php?idUsuario=' + idUser + "&code=" + code).subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }


    submitLogin(dato) {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl+'sesionMovil.php?usuarioMovil=' + dato.usuario + "&claveMovil=" + dato.clave).subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }

    loginPost(dato): Observable<any>{

        //El backend recogerá un parametro json
        const params = new FormData();
        params.append('usuario', dato.usuario);
        params.append('clave', dato.clave);
        return this.http.post(this.apiUrl+'sesionMovil.php', params);
    }

    reporteQuincena(idDato):Observable<any>{
    
        const params = new FormData();
        params.append('idUsuario', idDato);
        return this.http.post(this.apiUrl + 'tableroMovil.php', params);
    }

    contarRed(idUser){
        
        const params = new FormData();
        params.append('idUsuario', idUser);
        return this.http.post(this.apiUrl + "contarRed.php", params);
    }

    // departments-departamentos
    setDepartment(){
        let code = this.generar(7);
        return this.http.get(this.apiUrl + 'departmentMovil.php?code=' + code);
    }

    setCity(id){
        
        let params = new FormData();
        params.append('idCity', id);
        return this.http.post(this.apiUrl + 'cityMovil.php', params);
    }

    generar(longitud)
    {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
        var contraseña = "";
        for (let i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        return contraseña;
    }

}

