import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CognitoService } from './cognito.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean

  constructor(private cognitoService: CognitoService, private router: Router) {
    let obs = cognitoService.isLoggedIn();
    obs.subscribe(value => {
      this.isLoggedIn = value;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    //return this.checkLogin(url);
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }

  checkLogin(url: string): boolean {

    if (this.cognitoService.isLoggedIn()) { return true; }
    // TODO do something else here with url redirect
    this.router.navigate(['/login']);
    return false;
  }
}
