import { Injectable } from '@angular/core';

import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import { environment } from '../../environments/environment';
import { DbItem } from './db-item';

@Injectable()
export class DynamodbService {

  constructor() { }


  writeDbItem(item: DbItem) {
    console.log("DynamodbService: Writing item: " + item);
    var DDB = new DynamoDB({
      params: { TableName: environment.tableName }
    })

    // Write the item to the table
    var itemParams = {
      TableName: environment.tableName,
      Item: {
        name: { S: item.name },
        environment: { S: item.environment },
        lock: { N: item.lock },
        vars: { M: item.vars.toString() }
      }
    }
  }
}
