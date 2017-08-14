import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdInputModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { OAuthModule } from 'angular-oauth2-oidc';

import { LoginService } from './login.service';
import { AwsService } from './aws.service';
import { CognitoService } from './cognito.service';
import { DynamodbService } from './dynamodb.service';
import { AuthGuardService } from './auth-guard.service';
import { UnauthGuardService } from './unauth-guard.service';
import { initialState } from './state/model';
import { reducer } from './state/reducer';
import { ItemsEffects } from './state/effects';
import { AuthService } from './auth.service'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdInputModule,
    StoreModule.forRoot({ app: reducer }, { initialState }),
    EffectsModule.forRoot([ItemsEffects]),
    OAuthModule.forRoot()
  ],
  declarations: [],
  providers: [
    LoginService,
    AwsService,
    CognitoService,
    DynamodbService,
    AuthGuardService,
    UnauthGuardService,
    ItemsEffects,
    AuthService
  ],
  exports: []
})
export class CoreModule { }

