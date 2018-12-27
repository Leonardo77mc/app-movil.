import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { InvoicesProvider } from "../../providers/invoices/invoices";

@IonicPage()
@Component({
    selector: 'page-invoice',
    templateUrl: 'invoice.html',
})

export class InvoicePage {

    pet: string = "pendientes";
    invoices:any = [];
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private modal: ModalController,
                private servicesInvoice: InvoicesProvider,
                private loadin: LoadingController){

    }

    ionViewWillEnter(){
        this.viewInvoicesPending();
    }

    // Petition what to get invoice.
    viewInvoicesPending(){
        let dataUser = JSON.parse(localStorage.getItem('datosUsuario'));
        this.loading();
        this.servicesInvoice.submitPetitionInvoice(dataUser.id).subscribe(
            data=>{
                setTimeout(()=>{
                    this.invoices = data;
                },1400);
            },err=>{
                this.viewError();
            }
        )
    }

// Open Invoice.
    openInvoice(id_invoice):void{
        this.navCtrl.push('ViewInvoicePage', {'idinvoice':id_invoice});
    }

    openCart(){
        this.navCtrl.push('CarritoPage');
    }

    // function for begin search.
    beginSearch(){
        let m = this.modal.create('SearchPage');
        m.present();
    }

    loading(){
        this.loadin.create({
            spinner: 'bubbles',
            duration:1400
        }).present();
    }

    viewError(){
        this.loadin.create({
            spinner: 'hide',
            content: `<div class="custom-spinner-container">
                        <div class="custom-spinner-box">error en la peticion no hay acceso a internet?</div>
                    </div>`,
            enableBackdropDismiss: true
        })
    }

}
