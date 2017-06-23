import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CognitoService } from './cognito.service';

@Injectable()
export class UnauthGuardService {

  constructor(private cognitoService: CognitoService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return !this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.cognitoService.isLoggedIn()) { return true; }
    // TODO do something else here with url redirect
    return false;
  }

}
