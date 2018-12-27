import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

//pluging
import { Keyboard } from "@ionic-native/keyboard";
import { BackgroundMode } from "@ionic-native/background-mode";
import { AppMinimize } from '@ionic-native/app-minimize';

//directive
import { ParallaxHeaderDirective} from "../directives/parallax-header/parallax-header";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { ProductosProvider } from '../providers/productos/productos';
import { CategoryProvider } from '../providers/category/category';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CarritoProvider } from '../providers/carrito/carrito';
import { InvoicesProvider } from '../providers/invoices/invoices';


@NgModule({
  declarations: [
    MyApp,
    ParallaxHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    ProductosProvider,
    CategoryProvider,
    UsuarioProvider,
    CarritoProvider,
    Keyboard,
    BackgroundMode,
    InvoicesProvider,
    AppMinimize
  ]
})
export class AppModule {}
