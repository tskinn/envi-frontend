import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Rx from 'rxjs/Rx';

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
    this.router.navigate(['']);
  }

  logout() {
    this.logger.next(false);
    this.getUser().signOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  getUser() {
    return new CognitoUserPool({UserPoolId: environment.identityPoolId, ClientId: environment.clientId}).getCurrentUser()
  }

  // takes a jwt token and creates a CognitoIdentityCredentials object and stores it
  buildCreds(jwtToken: string) {
    const url = 'cognito-idp.' + environment.region.toLowerCase() + '.amazonaws.com/' + environment.identityPoolId;
    let logins: CognitoIdentity.LoginsMap = {};
    logins[url] = jwtToken;
    const params = {
      IdentityPoolId: environment.identityPoolId,
      Logins: logins
    };
    const creds = new AWS.CognitoIdentityCredentials(params);
    this.cognitoCreds = creds;
    AWS.config.credentials = creds;
  }

  // makes a necesary call to make sure everything is hunky dory
  primeThePump() {
    let clientParams: any = {};
    if (environment.sts_endpoint) {
      clientParams.endpoint = environment.sts_endpoint;
    }
    const sts = new STS(clientParams);
    sts.getCallerIdentity(function(err, data) {
      console.log('Successfully set the AWS credentials');
    });
  }

  authenticate(username: string, password: string) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: environment.identityPoolId,
      ClientId: environment.clientId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const self = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        self.jwtToken = result.getAccessToken().getJwtToken();
        self.buildCreds(self.jwtToken);
        self.logger.next(true);
        self.primeThePump();
      },
      onFailure: function(err) {
        console.log('authentication failed: ' + err)
        // TODO do something!
      },
    });
  }

  isAuthenticated(): Observable<any> {
    const cognitoUser = this.getUser()
    const sub = new Subject();
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log('CognitoService: Couldnt get the session: ' + err, err.stack);
          sub.next(false);
        } else {
          console.log('CognitoService: The session is: ' + session.isValid());
          sub.next(session.isValid());
        }
      });
    }
    return sub.asObservable();
  }
}
