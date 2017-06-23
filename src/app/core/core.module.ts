import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { AwsService } from './aws.service';
import { CognitoService } from './cognito.service';
import { DynamodbService } from './dynamodb.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LoginService, AwsService, CognitoService, DynamodbService, AuthGuardService]
})
export class CoreModule { }
