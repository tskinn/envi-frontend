import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';

import { LoginService } from './login.service';
import { AwsService } from './aws.service';
import { CognitoService } from './cognito.service';
import { DynamodbService } from './dynamodb.service';
import { AuthGuardService } from './auth-guard.service';
import { UnauthGuardService } from './unauth-guard.service';
import { ItemsEffects, appReducer, initialState } from './model';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    StoreModule.forRoot({ app: appReducer }, { initialState }),
    EffectsModule.forRoot([ItemsEffects])
  ],
  declarations: [],
  providers: [
    LoginService,
    AwsService,
    CognitoService,
    DynamodbService,
    AuthGuardService,
    UnauthGuardService,
    ItemsEffects
  ],
  exports: []
})
export class CoreModule { }
