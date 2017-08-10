import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { DynamodbService } from '../dynamodb.service';
import { State } from './model';
import { DbItem } from '../db-item';
import * as Acts from './actions';


@Injectable()
export class ItemsEffects {

  @Effect() updateItem = this.actions.ofType(Acts.UPDATE_ITEM)
    .switchMap(action => this.dynamo.updateDbItem((action as any).payload)
      .map((resp: DynamoDB.DocumentClient.UpdateItemOutput) => {
        const updatedItem = {
          environment: resp.Attributes['environment'],
          id: resp.Attributes['id'],
          lock: resp.Attributes['lock'],
          name: resp.Attributes['name'],
          vars: resp.Attributes['vars'],
        };
        // TODO just try returning resp.Attributes as the payload?
        return { type: Acts.ITEM_UPDATED, payload: updatedItem };
      })
      .catch(() => Observable.of({ type: Acts.ITEM_NOT_UPDATED }))
    );

  @Effect() deleteItem = this.actions.ofType(Acts.DELETE_ITEM)
    .switchMap(action => this.dynamo.deleteDbItem((action as any).payload.id)
               .map((resp: DynamoDB.DocumentClient.DeleteItemOutput) => {
                 const id = resp.Attributes['id'];
                 return { type: Acts.ITEM_DELETED, payload: id};
               })
               .catch(() => Observable.of({ type: Acts.ITEM_NOT_DELETED}))
                 );
  @Effect() getAllItems = this.actions.ofType(Acts.GET_ALL_ITEMS)
    .switchMap(() => this.dynamo.getAllItems()
               .map((resp: DynamoDB.DocumentClient.ScanOutput) => {
                 // TODO does scanoutput really map to dbitem ok?
                 return { type: Acts.ALL_ITEMS_GOT, payload: resp.Items }
               })
               .catch(() => Observable.of({ type: Acts.ALL_ITEMS_NOT_GOT}))
                 );

  constructor(private actions: Actions, private store: Store<State>, private dynamo: DynamodbService) { }
}
