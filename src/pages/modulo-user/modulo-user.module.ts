import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuloUserPage } from './modulo-user';

@NgModule({
  declarations: [
    ModuloUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuloUserPage),
  ],
})
export class ModuloUserPageModule {}
