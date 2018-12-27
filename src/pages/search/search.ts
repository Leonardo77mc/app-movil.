import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Searchbar, ViewController, ModalController } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";
import { Keyboard } from "@ionic-native/keyboard";

@IonicPage()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})

export class SearchPage{

    @ViewChild('searchBar') myBarra : Searchbar;

    public myInput:any;
    public items:any = [];
    public nameProduct:any =[];
    public nameProductAux:any =[];
    public idProduct:any=[];
    public producto:any =[];
    public viewSearch:boolean;
    constructor(public navCtrl: NavController,
                public servicesProduct: ProductosProvider,
                private viewControl: ViewController,
                private keyborad: Keyboard,
                public modal: ModalController){

    }

    getProduct(product:any) {
        this.servicesProduct.search(product).subscribe(
            (data) =>{
                this.items = data;
            },
            (error)=>{
                console.log("error de peticion");
            }
        )
    }

    ionViewWillEnter(){

        this.viewSearch = false;

        setTimeout(() => {
            this.myBarra.setFocus();
            this.keyborad.show();
        },700)

    }

    onCancel(ev:any){
        this.viewControl.dismiss();
    }

    onKeydown(ev:any){
        // dejamos ver la lista.
        this.viewSearch = true;
        // set val to the value of the searchbar
        const val = ev.target.value;

    //if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
                     this.getProduct(val);
        }
    }

    openProduct(ev:any){
        console.log(ev);
        let modaCtr = this.modal.create('DetalleProductoPage', {'id': ev});
        modaCtr.present();
    }

}
