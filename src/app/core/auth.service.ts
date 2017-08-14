import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _storage: Storage = localStorage;

  constructor() { }

  private storeAccessTokenResponse(accessToken: string, refreshToken: string, expiresIn: number) {
    this._storage.setItem("access_token", accessToken);

    if (expiresIn) {
      let expiresInMilliseconds = expiresIn * 1000;
      let now = new Date();
      let expiresAt = now.getTime() + expiresInMilliseconds;
      this._storage.setItem("expires_at", "" + expiresAt);
    }

    if (refreshToken) {
      this._storage.setItem("refresh_token", refreshToken);
    }
  }

  parseQueryString(query: string) {
    var data = {}, pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

    if (query === null) {
      return data;
    }

    pairs = query.split("&");

    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      separatorIndex = pair.indexOf("=");

      if (separatorIndex === -1) {
        escapedKey = pair;
        escapedValue = null;
      } else {
        escapedKey = pair.substr(0, separatorIndex);
        escapedValue = pair.substr(separatorIndex + 1);
      }

      key = decodeURIComponent(escapedKey);
      value = decodeURIComponent(escapedValue);

      if (key.substr(0, 1) == '/') {
        key = key.substr(1);
      }

      data[key] = value;
    }
  }

  padBase64(base64data) {
    while (base64data.length % 4 !== 0) {
      base64data += '=';
    }
    return base64data;
  }

  processIdToken(idToken, accessToken) {
    let tokenParts = idToken.split('.');
    let claimsBase64 = this.padBase64(tokenParts[1]);
    let claimsJson = atob(claimsBase64);
    let claims = JSON.parse(claimsJson);
    let savedNonce = this._storage.getItem("nonce");

    if (Array.isArray(claims.aud)) {
      if (claims.aud.every(v => v !== this.clientId)) {
        return false;
      }
    } else {
      if (claims.aud !== this.clientId) {
        return false;
      }
    }

    if (this.issuer && claims.iss !== this.issuer) {
      return false;
    }

    if (claims.nonce !== savedNonce) {
      return false;
    }

    if (accessToken && !this.checkAtHash(accessToken, claims)) {
      return false;
    }

    let now = Date.now();
    let issuedAtMSec = claims.iat * 1000;
    let expiresAtMSec = claims.exp * 1000;

    let tenMinutesInMSec = 1000 * 60 * 10;

    if (issuedAtMSec - tenMinutesInMSec >= now || expiresAtMSec + tenMinutesInMSec <= now) {
      console.log("token has expired");
      return false;
    }

    this._storage.setItem("id_token", idToken);
    this._storage.setItem('id_token_claims_obj', claimsJson);
    this._storage.setItem('id_token_expires_at', '' + expiresAtMSec);

    // if (this.validationHandler) {
    //   this.validationHandler(idToken);
    // }

    return true;
  }

  createAndSaveNonce(): Observable<string> {
    return this.createNonce().map((text) => {
      this._storage.setItem('nonce', text);
      return text;
    });
  }

  createNonce(): Observable<string> {
    return Observable.create((observer) => {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 40; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      observer.onNext(text);
      observer.onCompleted();
    })
  }

}
