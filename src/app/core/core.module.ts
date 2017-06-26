import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule } from '@angular/material';

import { LoginService } from './login.service';
import { AwsService } from './aws.service';
import { CognitoService } from './cognito.service';
import { DynamodbService } from './dynamodb.service';
import { AuthGuardService } from './auth-guard.service';
import { UnauthGuardService } from './unauth-guard.service';
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule
  ],
  declarations: [CapitalizePipe],
  providers: [LoginService, AwsService, CognitoService, DynamodbService, AuthGuardService, UnauthGuardService],
  exports: [CapitalizePipe]
})
export class CoreModule { }
