import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { DetailMateriComponent } from './detail-materi/detail-materi.component';
import { ListquizComponent } from './listquiz/listquiz.component';
import { MateriComponent } from './materi/materi.component';
import { TambahQuizComponent } from './tambah-quiz/tambah-quiz.component';

const routes: Routes = [
  { 
    path: '', 
    component: CourseComponent 
  },
  { 
    path: 'materi', 
    component: MateriComponent 
  },
  { 
    path: 'detailMateri/:id', 
    component: DetailMateriComponent 
  },
  { 
    path: 'listquiz/:id', 
    component: ListquizComponent 
  }, 
  {
    path: 'tambahSoal/:id',
    component: TambahQuizComponent
  },
  {
    path: 'editSoal/:id',
    component: TambahQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
