import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import * as CognitoIdentity from 'aws-sdk/clients/cognitoidentity';
import * as STS from 'aws-sdk/clients/sts';

import { environment } from '../../environments/environment';

@Injectable()
export class CognitoService {
  private jwtToken: string;
  private logger = new BehaviorSubject<boolean>(false);
  public cognitoCreds: AWS.CognitoIdentityCredentials;
  constructor(private router: Router) { }

  login() {
    this.logger.next(true);
    this.router.navigate(['/envi/search']);
  }

  logout() {
    this.logger.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  // taks a jwt token and creates a CognitoIdentityCredentials object and stores it
  buildCreds(jwtToken: string) {
    let url = 'cognito-idp.' + environment.region.toLowerCase() + '.amazonaws.com/' + environment.identityPoolId;
    let logins: CognitoIdentity.LoginsMap = {};
    logins[url] = jwtToken;
    let params = {
      IdentityPoolId: environment.identityPoolId,
      Logins: logins
    };
    let creds = new AWS.CognitoIdentityCredentials(params);
    this.cognitoCreds = creds;
    AWS.config.credentials = creds;
  }

  primeThePump() {
    let sts = new STS();
    sts.getCallerIdentity(function(err, data) {
      console.log("Successfully set the AWS credentials");
    });
  }

  authenticate(username: string, password: string) {
    var authenticationData = {
      Username: username,
      Password: password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var poolData = {
      UserPoolId: environment.identityPoolId,
      ClientId: environment.clientId
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    let self = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        this.token = result.getAccessToken().getJwtToken();
        this.logger.next(true);
      },

      onFailure: function(err) {
        // TODO do something!
      },
    });
  }

}
