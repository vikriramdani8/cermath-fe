import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path : '',
    component : HomeComponent,
    data : { title : 'Home' },
    canActivate : [ AuthGuard ],
    children : [
      {
        path : 'dashboard',
        loadChildren : () => import('./dashboard/dashboard.module').then( lazy => lazy.DashboardModule )
      },
      {
        path : 'course',
        loadChildren : () => import('./course/course.module').then( lazy => lazy.CourseModule )
      },
      {
        path : 'quiz',
        loadChildren : () => import('./quiz/quiz.module').then( lazy => lazy.QuizModule )
      },
      {
        path : 'account',
        loadChildren : () => import('./account/account.module').then( lazy => lazy.AccountModule )
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
