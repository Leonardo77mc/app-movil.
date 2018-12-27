import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";

@IonicPage()
@Component({
    selector: 'page-categoria',
    templateUrl: 'categoria.html',
})

export class CategoriaPage{

    // Variables.
    private idCategory:number;
    public products:any = [];
    items:any = [];
    posicion;
    infiniteScroll: any;

    //constructor.
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private categoryServices: ProductosProvider,
                private alertControl: AlertController,
                private modal: ModalController){

    }


    ionViewWillEnter(){
        
        this.printCategory();
        this.products = [];
        this.items = [];
        this.categoryServices.setCategoryProduct(this.idCategory).then(
            data =>{
                this.products = data;
                 this.posicion = 0;
                 for(this.posicion; this.posicion < 7; this.posicion++){
                            
                        if(this.posicion > parseInt(this.products.length) - 1){
                            continue;
                        }else{
                            
                            this.items.push(this.products[this.posicion]);
                        } 
                        
                 }
                    this.posicion = 7;       
                    let nuevaData = this.crearPares(this.items, 2);
                    this.products = nuevaData;
                    
            }
        );
    }

    doInfinite(infiniteScroll){
        this.infiniteScroll = infiniteScroll;
        this.categoryServices.setCategoryProduct(this.idCategory).then(
            data =>{
                this.products = data;
                 let tope = this.posicion + 7;
                 for(this.posicion; this.posicion < tope; this.posicion++){
                     if(this.posicion > parseInt(this.products.length) - 1){
                        infiniteScroll.enable(false);  
                        setTimeout(()=>{
                            this.infiniteScroll.enable(true);
                        },4000);      
                        continue;
                     }else{
                           
                        this.items.push(this.products[this.posicion]);
                     } 
                           
                 }
                
                            this.posicion = this.posicion + 7; 
                            let nuevaData = this.crearPares(this.items, 2);
                            this.products = nuevaData;
                            infiniteScroll.complete();
                    
            }
        );
      }

    
    //Obtener id de la categoria al iniciar la pagina.
    printCategory(){
        this.idCategory = this.navParams.get('id');
    }

    // Obtener los productos del services del provider productos.
    getCategoryProduct(id:any){
        this.categoryServices.setCategoryProduct(id).then(
            data =>{
                this.products = data;
                let newData = this.crearPares(this.products,2);
                this.products = newData;
            }, err =>{
                this.alertPetitionProduct();
            }
        )
    }

    crearPares(array:any, tamano:number){
        let arrayPar:any = [];
        for(let i =0; i < array.length; i += tamano){
            arrayPar.push(array.slice(i , i + tamano));
        }
        return arrayPar;
    }

    alertPetitionProduct(){
        this.alertControl.create({
            title: "",
            subTitle: "Error en la peticion de los productos",
            buttons: ['OK']
        }).present();
    }

    // function for begin search.
    beginSearch(){
        this.modal.create('SearchPage').present();
    }

    abrirDetalle(id:any){
        this.modal.create('DetalleProductoPage',{ 'id':id }).present();
    }

    openCart(){
        this.navCtrl.push('CarritoPage');
    }

    doRefresh(refresher){

        this.products = [];
        this.items = [];
    
        if(refresher){
            this.categoryServices.setCategoryProduct(this.idCategory).then(
                data =>{
                   
                     this.products = data;
                     this.posicion = 0;
                     for(this.posicion; this.posicion < 7; this.posicion++){
                                
                            if(this.posicion > parseInt(this.products.length) - 1){
                          
                                continue;
                            }else{                  
                             
                                this.items.push(this.products[this.posicion]);
                            } 
                            
                     }
                        
                        this.posicion = 7;       
                        let nuevaData = this.crearPares(this.items, 2);
                        this.products = nuevaData;
                }
            );
            //console.log(`interpolacion ${(()=>{ return "Me gustaria coquistar a Karina Robles Pomares"; } )()}`);
        }
        setTimeout(() => {
            console.log('Codigo Asincrono Finalizado');
            refresher.complete();
        }, 1000);

    }

}
