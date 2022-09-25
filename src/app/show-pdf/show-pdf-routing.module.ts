import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowPdfComponent } from './show-pdf.component';

const routes: Routes = [
  {
    path: ':id',
    component: ShowPdfComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowPdfRoutingModule { }
