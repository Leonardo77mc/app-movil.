import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";

@IonicPage()
@Component({
    selector: 'page-modulo-user',
    templateUrl: 'modulo-user.html',
})

export class ModuloUserPage{

    @ViewChild(Slides) slides: Slides;

    public quincena:any =[];
    public brazo;
    public bonoMultinivel;
    public totalQuincenaFormat;
    public nameRange;
    public misPuntos;
    public directos;
    public indirectos;
    public pointsGroup;
    public personasRed:any = [];
    public datosUser:any = [];
    public introduccion:string = "true";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public servicio: ServiceProvider) {

    }

    ionViewWillEnter(){
        this.datosUser = JSON.parse(localStorage.getItem('datosUsuario'));
        this.viewQuincena();
        this.viewRed();
        //localStorage.removeItem('introduccion');
        //console.log("LocalStorage last:" + localStorage.getItem('introduccion'));
    }

    doRefresh(refresher){

        if(refresher){

            this.viewQuincena();
            this.viewRed();
            //console.log(`interpolacion ${(()=>{ return "Me gustaria coquistar a Karina Robles Pomares"; } )()}`);
        }

        setTimeout(() => {
            console.log('Codigo Asincrono Finalizado');
            refresher.complete();
        }, 3000);
    }

    viewQuincena(){
        this.servicio.reporteQuincena(this.datosUser.id).subscribe(
            (data) =>{
                this.quincena = data;
                if(this.quincena != null){
                    this.quincena.brazoDebil !=null? this.quincena.brazoDebil == "der"? this.brazo = "Derecho" : this.brazo = "Izquierdo" : this.brazo = "Ninguno";
                    this.quincena.bonoEquipo != null? this.bonoMultinivel = this.quincena.bonoEquipo : this.bonoMultinivel = 0;
                    this.quincena.totaLiquidado != null? this.totalQuincenaFormat = this.formatearNumero(this.quincena.totaLiquidado) : this.totalQuincenaFormat = 0;
                    this.pointsGroup = this.quincena.puntos;
                    this.getRange(this.quincena.rango);
                }else{
                    this.getRange(0);
                    this.pointsGroup = 0;
                    this.totalQuincenaFormat = 0;
                    this.brazo = "Ninguno";
                    this.bonoMultinivel = 0;
                }
            },
            (error) =>{
                this.quincena = null;
            }
        )
    }

    formatearNumero(nStr) {
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }

    viewRed(){
        this.servicio.contarRed(this.datosUser.id).subscribe(
            (data) => {
                this.personasRed = data;
                if(this.personasRed != null){
                    this.misPuntos = this.personasRed.puntos.puntos;
                    this.directos = this.personasRed.directos;
                    this.indirectos = this.personasRed.indirectos;
                }else{
                    this.misPuntos = 0;
                    this.directos = 0;
                    this.indirectos = 0;
                }
            },
            (error) => {
                this.personasRed = null;
            }
        )
    }

    getRange(rango){

        switch(parseInt(rango)){
            case 1: { this.nameRange = "Ejecutivo";
                break; }
            case 2: { this.nameRange = "Experimentado";
                break; }
            case 3: { this.nameRange = "Senior";
                break; }
            case 4: { this.nameRange = "Bronce";
                break; }
            case 5: { this.nameRange = "Plata";
                break; }
            case 6: { this.nameRange = "Oro";
                break; }
            case 7: { this.nameRange = "Rubi";
                break; }
            case 8: { this.nameRange = "Esmeralda";
                break; }
            case 9: { this.nameRange = "Diamante";
                break; }
            case 10: { this.nameRange = "Doble Diamante";
                break; }
            case 11: { this.nameRange = "Vicepresidente";
                break; }
            case 12: { this.nameRange = "Presidente";
                break; }
            default:
            { this.nameRange = "Ninguno"; }
        }

    }

}

