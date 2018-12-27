import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductosProvider {

    // url que conecta las peticiones con la app web.
    apiUrl = 'https://allinapp.com.co/Acciones/servicesMovil/';
    constructor(public http: HttpClient) {
    }

    //metodo para mostrar los productos de la tienda.
    getProductos(){
    
        let code = this.generar(7);
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'listaProductos.php?code=' + code ).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }

    getSliderStore(){

        let code = this.generar(7);
        return new Promise((resolve, recje)=>{
            this.http.get(this.apiUrl + 'sliderStore.php?code=' + code).subscribe(data =>{
                resolve(data);
            }, err=>{
                recje(err);
            });
        })

    }

    setCategoryProduct(id:any){
       
        return new Promise((resolve, recje)=>{
            const params = new FormData();
            params.append('idCategory', id);
            this.http.post(this.apiUrl + 'categoryProduct.php', params).subscribe(data=>{
                resolve(data);
            },err=>{
                recje(err);
            });

        })
       
    }

    // metodo para mostrar el detalle del producto.
    setDetalle(id):Observable<any>{
 
        const params = new FormData();
        params.append('idProducto', id);
        return this.http.post(this.apiUrl + 'detalleProductoMovil.php', params);
    }

      //metodo para mostrar los productos de la tienda.
      search(product:any):Observable<any>{
        let param = new FormData();
        param.append('nameProduct', product);
        return this.http.post(this.apiUrl+'search.php', param);
    }

      generar(longitud)
    {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
        var contraseña = "";
        for (let i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        return contraseña;
    }

}
