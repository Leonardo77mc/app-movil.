import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage{

  @ViewChild(Slides) slides:Slides;
  varpayment:FormGroup;
  varpaymentcard:FormGroup;

  imagepayu = "https://allinapp.com.co/vistas/assets/img/banner_payu.png";
  imagefecty = "https://allinapp.com.co/vistas/assets/png/payU/efecty.jpg";
  imagebaloto = "https://allinapp.com.co/vistas/assets/png/payU/baloto.jpg";

  invoice:any = [];
  reportcash:any = [];
  totalinvoice;
  idinvoice;
  viewslide:boolean = false;
  viewEfectivo:boolean = false; 
  viewCard:boolean = false;
  viewEntrega:boolean = false;
  viewslide3:boolean = false;
  viewimage:boolean;
  methodpayment = null;
  mes:any = [];
  ano:any = [];
  formpayment:any=[];

  constructor(public navCtrl: NavController, 
              public servicesinvoice: InvoicesProvider,
              public loading: LoadingController,
              private formulario: FormBuilder,
              public navParams: NavParams){

            
  }

  ionViewWillEnter(){
      this.idinvoice = this.getIdbills();
      this.getdetailinvoice();
      this.createForm();
      this.createFormCard();

      this.mes = [
          {
              id: 1,
              mes: 'Enero'
          },
          {
              id:2,
              mes: 'Febrero'
          },
          {
              id:3,
              mes: 'Marzo'
          },
          {
              id:4,
              mes: 'Abril'
          },
          {
              id:5,
              mes: 'Mayo'
          },
          {
              id:6,
              mes: 'Junio'
          },
          {
              id:7,
              mes: 'Julio'
          },
          {
              id:8,
              mes: 'Agosto'
          },
          {
              id:9,
              mes: ' Septiembre'
          },
          {
              id:10,
              mes: 'Obtubre'
          },
          {
              id:11,
              mes: 'Noviembre'
          },
          {
              id:12,
              mes: 'Diciembre'
          }
      ]

     for(let i=2018; i<=2037; i++){
         this.ano.push(i);     }
  }

  getIdbills(){
      let idinvoice = this.navParams.get('idinvoice');
      return idinvoice;
  }

  getdetailinvoice(){

    this.totalinvoice = 0;

    this.servicesinvoice.setPetitionInvoice(this.idinvoice).subscribe(
        (data)=>{
            this.invoice = data;
            for(let i of this.invoice){
                this.totalinvoice = parseInt(this.totalinvoice) + (parseInt(i.precio) * parseInt(i.cantidad));
            }
               
        },err=>{
            // Banner de inactividad de internet.
        }
    )

}

loadin(){
     this.loading.create({
         spinner:'bubbles',
         duration:1700
     }).present();
}

nexSlides(){
    this.loadin();
    this.viewslide = true;
    setTimeout(()=>{
        this.slides.slideNext();
    },2000);
}

next(){
    this.loadin();
    console.log(this.methodpayment);
    switch(this.methodpayment)
    {

        case "efectivo":

            this.viewEntrega = false;
            this.viewCard = false;
            this.viewEfectivo = true;

            setTimeout(()=>{
                this.slides.slideNext();
            },2000); 

        break;
        case "contraentrega":

            this.viewEfectivo = false;
            this.viewEfectivo = false;
            this.viewEntrega = true;
         
            setTimeout(()=>{
                this.slides.slideNext();
            },2000);

        break;
        case "tarjeta_de_credito":

            this.viewEntrega = false;
            this.viewEfectivo = false;
            this.viewCard = true;

            setTimeout(()=>{
                this.slides.slideNext();
            },2000);

         break;
         default:
         console.log("No esta disponible esta opcion");   
        }
          
}

createForm() {
    this.varpayment = this.formulario.group({
        'name': [''],
        'lastnames': [''],
        'identificationcard': [''],
        'dotpayment': [''],
        'address' : [''],
        'telephone': ['']
    });
}

createFormCard() {
    this.varpaymentcard = this.formulario.group({
        'tipocard': [''],
        'mescard': [''],
        'yearcard': [''],
        'numbercard': [''],
        'namecard': [''],
        'lastnamescard': [''],
        'cedulacard': [''],
    });
}

onSubmit(){

    this.formpayment = this.varpayment.value;
    
    if(this.formpayment.name != "" && this.formpayment.lastnames !="" && this.formpayment.identificationcard != "" && this.formpayment.dotPayment !=""){
        
        this.servicesinvoice.setSubmitPayU(this.formpayment, this.idinvoice, this.totalinvoice).then(
            data=>{
                console.log(data);
            },err=>{
                console.log(err);
            }
        );
                
        }else{
            let message = "Hay uno o mas campos vacios";
            this.message(message);
        }
       
}

onSubmitcart(){

}

message(message){
    this.loading.create({
        spinner:'bubbles',
        content:`<h3>${message}</h3>`,
        duration: 1400,
    }).present();
}


}