import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";
import { CarritoProvider } from "../../providers/carrito/carrito";

@IonicPage()
@Component({
    selector: 'page-detalle-producto',
    templateUrl: 'detalle-producto.html',
})

export class DetalleProductoPage{

    public  idProducto:number;
    public detalleProducto:any =[];
    public numberFormat:any;
    public productQuantity:any;
    public detailCart:any=[];
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private servicios: ProductosProvider,
                private modal: ModalController,
                private loadinControl: LoadingController,
                private cartService:CarritoProvider) {
            
    }

    ionViewWillEnter(){
        this.productQuantity = 1;
        this.idProducto = this.navParams.get('id');
        this.getDetalles(this.idProducto);
    }

    getDetalles(id:number){
        this.servicios.setDetalle(id).subscribe(
            data =>{
                console.log(data);
                this.detalleProducto = data;
                this.detalleProducto = {
                    id: this.detalleProducto[0].id,
                    producto:this.detalleProducto[0].producto,
                    cantidad:this.detalleProducto[0].cantidad,
                    valor:this.detalleProducto[0].valor,
                    promedio:this.detalleProducto[0].promedio,
                    codigo:this.detalleProducto[0].codigo,
                    estado:this.detalleProducto[0].estado,
                    categoria:this.detalleProducto[0].categoria,
                    titulo:this.detalleProducto[0].titulo,
                    url:this.detalleProducto[0].url,
                }
                this.numberFormat = this.detalleProducto.valor;
                this.numberFormat = this.formatearNumero(this.numberFormat);
            },
            error =>{
                console.log("Error en la peticion");
            }
        )
    }

    formatearNumero(nStr) {
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)){
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }

    // function for begin search.
    beginSearch(){
        let m = this.modal.create('SearchPage');
        m.present();
    }

    addProduct(){
        this.productQuantity += 1;
    }

    removeProduct(){
        this.productQuantity > 1?this.productQuantity -= 1:this.productQuantity = 1;
    }

    agregarProducto(){

        let datosUser = JSON.parse(localStorage.getItem('datosUsuario'));

        this.cartService.addCart(this.detalleProducto.id, this.productQuantity, datosUser.id).subscribe(
            data=>{
                this.detailCart =data;
                if(this.detailCart.mensaje != 'false') {
                            if (this.detailCart.length > 0) {
                                this.sussesPetition();
                            }else{
                                this.productExhausted();
                            }
                }
            },err=>{
                this.errorAddCart()
            }
        )

    }

    errorAddCart(){
        let loading = this.loadinControl.create({
            spinner: 'hide',
            content: `
                      <div class="custom-spinner-container">
                        <div class="custom-spinner-box">error en la peticion no hay acceso a internet?</div>
                      </div>`,
            enableBackdropDismiss:true,
        });
        loading.present();
    }

    sussesPetition(){
        let loading = this.loadinControl.create({
            spinner:'bubbles',
            content : `
                      <div class="custom-spinner-container">
                        <div class="custom-spinner-box">Producto agregado correctamente</div>
                      </div>
          `,
            duration: 1000
        });
        loading.present();
    }

    openCart(){
        this.navCtrl.push('CarritoPage');
    }

    productExhausted(){

        let loading = this.loadinControl.create({
            spinner: 'bubbles',
            content: `
                      <div class="custom-spinner-container">
                        <div class="custom-spinner-box">Este producto esta agotado</div>
                      </div>`,
            duration:1000
        });
        loading.present();
    }

}
