import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './state/model';
import { CognitoService } from './cognito.service';
import { LoginService } from './login.service';
import { getLoggedIn } from './state/reducer';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean

  constructor(private store: Store<State>, private router: Router) {
    store.select(getLoggedIn).subscribe(bo => this.isLoggedIn = bo)
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
    if (this.isLoggedIn) { return true; }
    // TODO do something else here with url redirect
    this.router.navigate(['/login']);
    return false;
  }
}
