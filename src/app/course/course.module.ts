import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { MateriComponent } from './materi/materi.component';
import { DetailMateriComponent } from './detail-materi/detail-materi.component';
import { DndDirective } from './materi/dnd.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ListquizComponent } from './listquiz/listquiz.component';
import { TambahQuizComponent } from './tambah-quiz/tambah-quiz.component';
import { LoadingComponent } from '../shared/view/loading/loading';

@NgModule({
  declarations: [
    CourseComponent,
    MateriComponent,
    DetailMateriComponent,
    DndDirective,
    ListquizComponent,
    TambahQuizComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ]
})
export class CourseModule { }
