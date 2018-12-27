import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { ServiceProvider } from "../../providers/service/service";


@IonicPage()
@Component({
    selector: 'page-registrar',
    templateUrl: 'registrar.html',
})
export class RegistrarPage{

    varForm: FormGroup;
    private usuarioStorage;
    private brazos: any = [];
    public estadoDerecho: boolean;
    public estadoIzquierdo: boolean;
    public saveUser: any = [];
    public department:any =[];
    public cities:any =[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public formulario: FormBuilder,
                private userServices: UsuarioProvider,
                private alertControl: AlertController,
                private LoadindModal: LoadingController,
                private services: ServiceProvider) {
                                   
                    this.createForm();
                    
    }

    ionViewWillEnter() {
        this.usuarioStorage = JSON.parse(localStorage.getItem('datosUsuario'));
        this.getBrazosDirectos();
        this.getDepartment();
    }
    // users: check the state of the arms.
    estadoBrazosView(brazoDerecho: boolean, brazoIzquierdo: boolean) {

        if ((brazoIzquierdo && brazoDerecho) || (!brazoIzquierdo && !brazoDerecho) || brazoIzquierdo) {
            this.estadoDerecho = true;
        } else {
            this.estadoDerecho = false;
        }

        if ((brazoIzquierdo && brazoDerecho) || (!brazoIzquierdo && !brazoDerecho) || brazoDerecho) {
            this.estadoIzquierdo = true;
        } else {
            this.estadoIzquierdo = false;
        }

    }
    // users: get the arms directs.
    getBrazosDirectos() {
        this.userServices.verificarBrazosDirectos(this.usuarioStorage.id).subscribe(
            data => {
                this.brazos = data;
                this.estadoBrazosView(this.brazos.brazoDerecho, this.brazos.brazoIzquierdo);
            },
            error => {
                console.log("Error en la Peticion");
            }
        );
    }

    createForm() {
        this.varForm = this.formulario.group({
            'email': [''],
            'usuario': [''],
            'password': [''],
            'genero': [''],
            'nombre': [''],
            'primerApellido': [''],
            'segundoApellido': [''],
            'tipoDocument': [''],
            'cedula': [''],
            'fnacimiento': [''],
            'telefono': [''],
            'direccion': [''],
            'departamento': [''],
            'ciudad': [''],
            'brazo': [''],
            'cedulaBeneficiario': [''],
            'emailValidate': ['']
        });
    }

    // method what form submit.
    onSubmit(): void {

        if (this.varForm.value.usuario != "" && this.varForm.value.brazo != "" && this.varForm.value.cedula != "" && this.varForm.value.ciudad != "" && this.varForm.value.departamento != "" && this.varForm.value.direccion != "" && this.varForm.value.email != "" && this.varForm.value.emailValidate != "" && this.varForm.value.fnacimiento != "" && this.varForm.value.genero != "" && this.varForm.value.nombre != "" && this.varForm.value.password != "" && this.varForm.value.primerApellido != "" && this.varForm.value.segundoApellido != "" && this.varForm.value.telefono != "" && this.varForm.value.tipoDocument != "" && this.varForm.value.usuario != "") {
            this.userServices.addUserRed(this.varForm.value, this.usuarioStorage.id).subscribe(
                data => {
                    this.saveUser = data;
                    this.showAlert();
                    this.getBrazosDirectos();
                },
                error => {
                    this.errorAlert();
                }
            )
        } else {
            this.presentLoadingCustom();
        }
    }

    // services: get departments.
    getDepartment(){
        this.services.setDepartment().subscribe(
            data=>{
                this.department=data;
            },err=>{
                this.errPetitionModal();
            }
        )
    }

    // services: get cities.
    getCities(id){
        this.services.setCity(id).subscribe(
            data =>{
                this.cities = data;
            },err=>{
                this.errPetitionModal();
            }
        )
    }

    // submit id department since the select para get the municipality.
    searchMunicipality(val:any){
        let idDepartment = val._value;
        console.log(idDepartment);
        this.getCities(idDepartment);
    }

    alertFieldsVoid() {
        this.alertControl.create({
            title: "",
            subTitle: "Hay uno o mas campos vacios",
            buttons: ['OK']
        }).present();
    }

    showAlert() {
        let loading = this.LoadindModal.create({
            spinner: 'hide',
            content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">${this.saveUser.mensaje}</div>
      </div>`,
            duration:3000
        });
        loading.present();
    }

    errorAlert() {
        let alert = this.alertControl.create({
            title: 'Hay un error en la Peticion',
            subTitle: '',
            buttons: ['OK']
        });
        alert.present();
    }

    // loading Modals.
    presentLoadingCustom() {
        let loading = this.LoadindModal.create({
            spinner: 'hide',
            content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">Hay uno o mas campos vacios...</div>
      </div>`,
            enableBackdropDismiss: true,
        });
        loading.present();
    }

    // modal of department.
    // loading Modals.
    errPetitionModal() {
        let loading = this.LoadindModal.create({
            spinner: 'hide',
            content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">error en la peticion no hay acceso a internet?</div>
      </div>`,
            duration: 2000
        });
        loading.present();
    }
}
