import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";


@Injectable()
export class InvoicesProvider {

    // url que conecta las peticiones con la app web.
    apiUrl = 'https://allinapp.com.co/Acciones/servicesMovil/';
    apiUrl2 = 'https://allinapp.com.co/Acciones/';
    
    constructor(public http: HttpClient ) {

    }

    submitPetitionInvoice(idUser):Observable<any>{
        
        let param = new FormData();
        param.append('idUser', idUser);
        return this.http.post(this.apiUrl + 'invoicePending.php', param);

    }

    setPetitionInvoice(idinvoice):Observable<any>{
      
        let param = new FormData();
        param.append('idinvoice', idinvoice);
        return this.http.post(this.apiUrl + 'detailnvoice.php', param);

    }

    setSubmitPayU(formcash, idinvoice, total){

        return new Promise((resolve, recje)=>{
            let params = new FormData();
            params.append('nameEntitle', formcash.name);
            params.append('numberDocument', formcash.identificationcard);
            params.append('lastnames', formcash.lastnames);
            params.append('dotpayment', formcash.dotPayment);
            params.append('idInvoice', idinvoice);
            params.append('totalinvoice', total);

             this.http.post(this.apiUrl + 'paymentCash.php', params).subscribe(data=>{
                resolve(data);
            },err=>{
                recje(err);
            });

        });

    }

    setDbregistryPayment(formcash, idinvoice, res){

        return new Promise((resolve, recje)=>{

            let params = new FormData();
            params.append('nameEntitle', formcash.name);
            params.append('numberDocument', formcash.identificationcard);
            params.append('lastnames', formcash.lastnames);
            params.append('dotPayment', formcash.dotPayment);
            params.append('idInvoice', idinvoice);
            params.append('address', formcash.address);
            params.append('telephone', formcash.telephone);
            params.append('numberorder', res.transactionResponse.orderId);
            params.append('numbertransaction', res.transactionResponse.transactionId);
            params.append('urlpdf', res.transactionResponse.extraParameters.URL_PAYMENT_RECEIPT_PDF);
            params.append('urlhtml', res.transactionResponse.extraParameters.URL_PAYMENT_RECEIPT_HTML);
            params.append('reference', res.transactionResponse.extraParameters.REFERENCE);
            params.append('state', res.res.transactionResponse.state);

            this.http.post(this.apiUrl2 + 'perfomPaymentCash.php', params).subscribe(data=>{
                resolve(data);
            },err=>{
                recje(err);
            });

        });
    }

}
