import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";

@IonicPage()
@Component({
    selector: 'page-carrito',
    templateUrl: 'carrito.html',
})

export class CarritoPage {
    
    imagecart = "https://allinapp.com.co/vistas/assets/img/cart_void.png";
    imagecart2 = "https://allinapp.com.co/vistas/arbol/assets/img/shoppingsuccefull.png";
    // variable.
    public products:any = [];
    public datasUser:any;
    public errorPetition:string = "error en la peticion no hay acceso a internet?";
    private cancel:boolean;
    public botones:boolean;
    public totalOrder:number;
    public totalDots:any;
    private idinvoice:number;
    viewcartfull:boolean;
    viewcartvoid:boolean;

    constructor(private servicesCart: CarritoProvider,
                private navCtrl: NavController,
                private loadin:LoadingController){
        
    }

    ionViewWillEnter(){
        this.viewDetailCart();
    
    }

    //View the detail of the cart.
    viewDetailCart(){
        this.datasUser = JSON.parse(localStorage.getItem('datosUsuario'));
        this.servicesCart.getDetailCart(this.datasUser.id).subscribe(
            data=>{

                this.products = data;
                if(this.products.length > 0){
                             this.botones = true;
                }

                else if(this.idinvoice > 0){
                             this.viewcartfull = true;
                             this.viewcartvoid = false;
                }else{
                    this.viewcartvoid = true;
                }

                this.totalOrder = 0;
                this.totalDots = 0;
                for(let i of this.products){
                    this.totalOrder = this.totalOrder + parseInt(i.valor) * parseInt(i.cantidad);
                    if(i.categoria === "2"){
                        this.totalDots = this.totalDots + (parseFloat(i.valor) * parseFloat(i.cantidad)/2850);
                    }

                }

            },err =>{
                this.paymentSuccefull(this.errorPetition);
            }
        )
    }

    // Save the Order.
    saveOrder(){
        this.servicesCart.submitSaveOrder(this.datasUser.id, this.totalOrder).subscribe(
            data=>{
                let request = data;
                let mensaje:string;
                this.idinvoice = request.idInvoice;
                if(request.mensaje === true) {
                    mensaje = "Compra Realizada Correctamente";
                    this.paymentSuccefull(mensaje);
                    this.products = [];
                    this.botones = false;
                    this.viewcartfull = true;
                }else{
                    mensaje = "Hubo un problema, por favor vuelve a intentar";
                    this.paymentSuccefull(mensaje);
                }
            },err=>{

            }
        )
    }

    // Cancel the order
    cancelOrder(){
        this.loadinSpinner();
        setTimeout(()=>{
            this.servicesCart.submitCancelOrder(this.datasUser.id).subscribe(
                data=>{
                    this.cancel = data;
                    if(this.cancel === true){
                        let mensaje = "Hubo un problema al cancelar la compra, por favor vuelve a intentarlo";
                        this.paymentSuccefull(mensaje);
                    }else{
                        this.products = [];
                        this.botones = false;
                        this.viewcartvoid = true;
                        this.viewcartfull = false;
                    }
                },err=>{
                    let mensaje = "No hay internet para esta operacion";
                    this.paymentSuccefull(mensaje);
                }
            )
        },2000);
    }

    loadinSpinner(){
        this.loadin.create({
            spinner:'bubbles',
            duration:2000
        }).present();
    }
    
    paymentSuccefull(mensaje){
        this.loadin.create({
            spinner:'bubbles',
            content: `<div class="custom-spinner-container">
                      <div class="custom-spinner-box">${mensaje}</div>
                      </div>`,
            duration:2000
        }).present();
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

    payments(){
        this.navCtrl.push('PaymentsPage', {'idinvoice': this.idinvoice});
    }

}
