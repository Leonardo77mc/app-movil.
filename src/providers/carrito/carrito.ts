import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CarritoProvider {

    apiUrl = 'https://allinapp.com.co/Acciones/servicesMovil/';
    constructor(public http: HttpClient) {

    }


    addCart(id, unidades, idUser){
       
        let params = new FormData();
        params.append('idProducto', id);
        params.append('unidades', unidades);
        params.append('idUser', idUser);
        return this.http.post(this.apiUrl + "addCarroMovil.php", params);
    }

    getDetailCart(id):Observable<any>{
    
        let params = new FormData();
        params.append('idUser', id);
        return this.http.post(this.apiUrl + 'DetailCart.php', params);
    }

    //save the order.
    submitSaveOrder(id, total):Observable<any>{
 
        let params = new FormData();
        params.append('idUser', id);
        params.append('totalPrecio', total);
        return this.http.post(this.apiUrl + "orderSuccessful.php", params);
    }

    //cancel the order.
    submitCancelOrder(id):Observable<any>{
        
        let params = new FormData();
        params.append('idUser', id);
        return this.http.post(this.apiUrl + "cancelOrder.php", params);
    }

}
