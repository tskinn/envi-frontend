import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CognitoService } from './cognito.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class UnauthGuardService {

  constructor(private authService: AuthGuardService, private cognitoService: CognitoService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    //return !this.checkLogin(url);
    return this.checkLogin()
  }

  checkLogin(): boolean {
    console.log("checking loging from unauth");
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/search']);
      return false;
    }
    return true;
  }

}
