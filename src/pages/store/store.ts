import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Slides, ModalController, Nav } from 'ionic-angular';
import { ProductosProvider} from "../../providers/productos/productos";
import { CategoryProvider } from "../../providers/category/category";


@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

    @ViewChild(Slides)slides:Slides;
   
    categories:any =[];
    galleryStore:any = [];
    responseData:any;
    items:any = [];

    testRadioOpen = false;
    testRadioResult;

    // Imagen por defecto.
    defaultImage = "assets/imgs/camera.gif";

    // Propiedades de la barra de busqueda de los productos.
    searchQuery: string = '';
    productos:any = [];
    posicion = 0;
    infiniteScroll: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public servicio: ProductosProvider,
              private categoryServices: CategoryProvider,
              public vistaCrontoler: ViewController,
              public loadin: LoadingController,
              public nav: Nav,
              public modal: ModalController) {
  }

  doInfinite(infiniteScroll){
    this.infiniteScroll = infiniteScroll;
    this.servicio.getProductos().then(
        (data)=>{
            this.productos = data;
             let tope = this.posicion + 7;
             for(this.posicion; this.posicion < tope; this.posicion++){ 
                 if(this.posicion > parseInt(this.productos.length) - 1){
                            infiniteScroll.enable(false);
                            setTimeout(()=>{
                                this.infiniteScroll.enable(true);
                            },4000);    
                            continue;
                 }else{
                       
                    this.items.push(this.productos[this.posicion]);
                 } 
                       
             }
                        this.posicion = this.posicion + 7; 
                        let nuevaData = this.crearPares(this.items, 2);
                        this.productos = nuevaData;
                        infiniteScroll.complete();              
        }
    );
  }


    doRefresh(refresher){
 
        if(refresher){
            this.productos = [];
            this.items = [];
            this.getSPhotosSlider()
            this.getCategory();

            this.servicio.getProductos().then(
                (data)=>{

                    this.productos = data;
                     let tope = 7;
                     for(let i = 0; i < tope; i++){
                            this.items.push(this.productos[i]);
                     }
                                this.posicion = 7; 
                                let nuevaData = this.crearPares(this.items, 2);
                                this.productos = nuevaData;    
                }
            );
            
            //console.log(`interpolacion ${(()=>{ return "Me gustaria coquistar a Karina Robles Pomares"; } )()}`);
        }
        setTimeout(() => {
            console.log('Codigo Asincrono Finalizado');
            refresher.complete();
        }, 1000);

    }

    ionViewWillEnter(){

              this.productos = [];
              this.items = [];
              this.getSPhotosSlider();
              this.getCategory();
              this.servicio.getProductos().then(
                (data)=>{
                         this.productos = data;
                         this.posicion = 0;
                     for(this.posicion; this.posicion < 7; this.posicion++){

                        if(this.posicion > parseInt(this.productos.length) - 1){
                            continue;
                        }else{
                            this.items.push(this.productos[this.posicion]);
                        } 
                        
                     }
                      
                        this.posicion = 7;       
                        let nuevaData = this.crearPares(this.items, 2);
                        this.productos = nuevaData;
                        
                }
            );
    }


    getCategory(){

        this.categoryServices.setCategories().subscribe(
            data=>{
                this.categories = data;
            },
            err=>{
                this.alertErrorPetitionStore();
            }
        )
    }

    getSPhotosSlider(){

        this.servicio.getSliderStore().then(
            data=>{
                this.galleryStore = data;
            },err=>{
                this.alertErrorPetitionStore();
            }
        )
    }

    setProductos() {
        this.servicio.getProductos()
            .then(data => {
                this.productos = data;
                let nuevaData = this.crearPares(this.productos, 2);
                this.productos = nuevaData;
            });
    }

    crearPares(array:any, tamano:number){
        let arrayPar:any = [];
        for(let i =0; i < array.length; i += tamano){
            arrayPar.push(array.slice(i , i + tamano));
        }
        return arrayPar;
    }

    closeModal(){
        this.vistaCrontoler.dismiss();
    }

    //alerta de error de peticion de las categorias.
    alertErrorPetition(){
        this.loadin.create({
            spinner: 'hide',
            content: `
              <div class="custom-spinner-container">
                <div class="custom-spinner-box">Error en la petición de las categorias</div>
              </div>`,
            enableBackdropDismiss:true
        }).present();
    }

    alertErrorPetitionStore(){
        this.loadin.create({
            spinner: 'hide',
            content: `
              <div class="custom-spinner-container">
                <div class="custom-spinner-box">Error en la peticion de las fotografías</div>
              </div>`,
            enableBackdropDismiss:true
        }).present();
    }

    abrirDetalle(id:any){
        this.modal.create('DetalleProductoPage',{ 'id':id }).present();
    }

    abrirCategoria(c:any):void{
        this.modal.create('CategoriaPage', { 'id': c }).present();

    }

}
