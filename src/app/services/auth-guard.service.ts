import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { dialog } from '../function/alert';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    // tslint:disable-next-line:prefer-const
    let url: string = state.url;
    return this.checkLogin(url);
  }

  async checkLogin(url: string): Promise<boolean> {
    const status = await this.authService.isLoggedIn();
    if (status) {
      return status;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
