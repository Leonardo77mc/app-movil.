import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CategoryProvider {

    private apiUrl = 'https://allinapp.com.co/Acciones/servicesMovil/';
    constructor(public http: HttpClient) {
    }

    setCategories(){
        let code = this.generar(7);
        return this.http.get(this.apiUrl + 'categoryMovil.php?code=' + code);
    }

    generar(longitud)
    {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
        var contraseña = "";
        for (let i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        return contraseña;
    }

}
