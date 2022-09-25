import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowPdfRoutingModule } from './show-pdf-routing.module';
import { ShowPdfComponent } from './show-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ShowPdfComponent
  ],
  imports: [
    CommonModule,
    ShowPdfRoutingModule,
    PdfViewerModule
  ]
})
export class ShowPdfModule { }
