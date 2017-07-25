import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import { environment } from '../../environments/environment';
import { DbItem } from './db-item';

@Injectable()
export class DynamodbService {
  constructor() { }

  public writeDbItem(item: DbItem): Observable<DynamoDB.DocumentClient.PutItemOutput> {
    console.log("DynamodbService: Writing item: " + item);
    var DDB = new DynamoDB.DocumentClient();
    // Write the item to the table
    let params = {
      TableName: environment.tableName,
      Item: {
        id: item.id.toString(),
        name: item.name,
        environment: item.environment,
        lock: item.lock.toString(),
        vars: item.vars
      }
    };
    var putItem = Rx.Observable.bindNodeCallback(DDB.put);
    return putItem(params);
  }

  public deleteDbItem(id: number): Observable<DynamoDB.DocumentClient.DeleteItemOutput> {
    let params = {
      TableName: environment.tableName,
      Key: {
        id: id
      }
    };
    var DDB = new DynamoDB.DocumentClient();
    var deleteItem = Rx.Observable.bindNodeCallback(DDB.delete);
    return deleteItem(params);
  }

  public updateDbItem(dbItem: DbItem): Observable<DynamoDB.DocumentClient.UpdateItemOutput> {
    let params = {
      TableName: environment.tableName,
      Key: { id: dbItem.id },
      UpdateExpression: "set #l = :l + :o #v = :v",
      ConditionExpression: "#l = :l",
      ExpressionAttributeNames: {
        "#l": "lock",
        "#v": "vars"
      },
      ExpressionAttributeValues: {
        ":l": dbItem.lock,
        ":o": 1,
        ":v": dbItem.vars
      }
    };
    let docClient = new DynamoDB.DocumentClient();
    var updateItem = Rx.Observable.bindNodeCallback(docClient.update);
    return updateItem(params);
  }

  public getAllItems(): Observable<DynamoDB.DocumentClient.ScanOutput> {
    let params = {
      TableName: environment.tableName
    }
    let docClient = new DynamoDB.DocumentClient();
    var scan = Rx.Observable.bindNodeCallback(docClient.scan);
    return scan(params);
  }
}
