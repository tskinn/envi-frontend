import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Store } from '@ngrx/store';
import * as Acts from './state/actions';
import { State } from './state/model';
import { OAuthService } from 'angular-oauth2-oidc';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk/global';

import { environment } from '../../environments/environment';
import { DbItem } from './db-item';

@Injectable()
export class DynamodbService {
  constructor(private oauthService: OAuthService, private store: Store<State>) { }

  public writeDbItem(item: DbItem): Observable<DynamoDB.DocumentClient.PutItemOutput> {
    console.log('DynamodbService: Writing item: ' + item);
    const DDB = new DynamoDB.DocumentClient();
    // Write the item to the table
    const params = {
      TableName: environment.tableName,
      Item: {
        id: item.id.toString(),
        application: item.application,
        environment: item.environment,
        lock: item.lock.toString(),
        variables: item.variables
      }
    };
    const putItem = Rx.Observable.bindNodeCallback(DDB.put);
    return putItem(params);
  }

  public deleteDbItem(id: number): Observable<DynamoDB.DocumentClient.DeleteItemOutput> {
    const params = {
      TableName: environment.tableName,
      Key: {
        id: id
      }
    };
    const DDB = new DynamoDB.DocumentClient();
    const deleteItem = Rx.Observable.bindNodeCallback(DDB.delete);
    return deleteItem(params);
  }

  public updateDbItem(dbItem: DbItem): Observable<DynamoDB.DocumentClient.UpdateItemOutput> {
    const params = {
      TableName: environment.tableName,
      Key: { id: dbItem.id },
      UpdateExpression: 'set #l = :l + :o #v = :v',
      ConditionExpression: '#l = :l',
      ExpressionAttributeNames: {
        '#l': 'lock',
        '#v': 'variables'
      },
      ExpressionAttributeValues: {
        ':l': dbItem.lock,
        ':o': 1,
        ':v': dbItem.variables
      }
    };
    const docClient = new DynamoDB.DocumentClient();
    const updateItem = Rx.Observable.bindNodeCallback(docClient.update);
    return updateItem(params);
  }

  public getAllItems(): void  {
    AWS.config.region = environment.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.identityPoolId,
      Logins:  { 'kyani.okta.com': this.oauthService.getIdToken() },
    })
    console.log(AWS.config);
    const params = {
      TableName: environment.tableName
    }
    const docClient = new DynamoDB.DocumentClient();
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < data.Items.length; i++) {
          for (let j = 0; j < data.Items[i].variables.length; j++) {
            data.Items[i].variables[j].value = atob(data.Items[i].variables[j].value);
          }
        }
        this.store.dispatch({type: Acts.ITEMS_UPDATED, payload: data.Items})
      }
    });
    // console.log('docClient: ', docClient.scan);
    // const scan = Rx.Observable.bindNodeCallback(docClient.scan);
    // console.log(scan);
    // return scan(params);
  }
}
