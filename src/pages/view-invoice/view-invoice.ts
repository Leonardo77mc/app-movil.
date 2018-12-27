import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoicesProvider } from "../../providers/invoices/invoices";

@IonicPage()
@Component({
    selector: 'page-view-invoice',
    templateUrl: 'view-invoice.html',
})
export class ViewInvoicePage {

    invoice:any= [];
    total:any;
    totalpuntos;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private servicesinvoice: InvoicesProvider,
                //private loadin: LoadingController,
            ){
    
    }

    getinvoice(){
        let idinvoice = this.navParams.get('idinvoice');
        return idinvoice;
    }

    ionViewWillEnter(){
        this.getdetailinvoice();
    }

    getdetailinvoice(){

        let idinvoice = this.getinvoice();
        console.log(idinvoice);
        this.servicesinvoice.setPetitionInvoice(idinvoice).subscribe(
            (data)=>{
                this.invoice = data;
                this.total = 0;
                this.totalpuntos = 0;
                for(let i of this.invoice){
                    this.total = parseInt(this.total) + parseInt(i.precio) * parseInt(i.cantidad);
                    if(i.id_categoria == "2"){
                          this.totalpuntos = parseFloat(this.totalpuntos) + parseFloat(i.precio) / 2850;
                    }
                }
                this.totalpuntos = (this.totalpuntos).toFixed(2);
                

            },err=>{
                //this.loading(); cambiar por un evento que indique que no hay conexion a internet.
            }
        )

    }
/*
    openPayment(){
        this.loadin.create({
            spinner: "hide",
            content:`
            <div class="custom-spinner-container">
                 <div class="custom-spinner-box">
                 
                 <div>
                        dkddkkfkdvnkdvndkdskndA simple dark alert—check it out!<br>
                        dkddkkfkdvnkdvndkdskndA simple dark alert—check it out!<br>
                        dkddkkfkdvnkdvndkdskndA simple dark alert—check it out!<br>
                        dkddkkfkdvnkdvndkdskndA simple dark alert—check it out!<br>
                        dkddkkfkdvnkdvndkdskndA simple dark alert—check it out!<br>
                 </div>

                 </div>
            </div>`,
            enableBackdropDismiss:true,
            cssClass: 'b-radius' 
        }).present();
    }

    */

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

    openPayment(){

        let idinvoice = this.getinvoice();
        this.navCtrl.push('PaymentsPage', {'idinvoice': idinvoice});

    }


}
