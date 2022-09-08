import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ls: LocalStorageService,
    private generalService: GeneralService) {
  }

  public login(userData: any, result: any): void {
    const URI = env.apiBaseUrl+ '/master/login';
    this.httpClient.post(URI, userData).subscribe( (res: any) => {
      if(res['success']){
        this.ls.insertValue('user', JSON.stringify(res.data));
        this.ls.insertValue('token', res.data.token);
        this.router.navigateByUrl('/');
        result(true)
      } else {
        this.generalService.swalAlert('Error!', res.message, 'error')
        result(false);
      }
    }, error => {
      this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(!!this.ls.getValue('user') && !!this.ls.getValue('token'));
    });
  }
}

