import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewInvoicePage } from './view-invoice';

@NgModule({
  declarations: [
    ViewInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewInvoicePage),
  ],
})
export class ViewInvoicePageModule {}
