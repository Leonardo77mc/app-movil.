import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisUsuariosPage } from './mis-usuarios';

@NgModule({
  declarations: [
    MisUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisUsuariosPage),
  ],
})
export class MisUsuariosPageModule {}
