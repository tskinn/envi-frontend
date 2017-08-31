import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  @Effect() login = this.actions.ofType(Acts.LOGGED_IN)
    .map(action => {
      console.log('Logging in effect');
      // this.router.navigateByUrl('').then(e => console.log('then: ' + e)).catch(e => console.log('catch: ' + e));
      // this.router.navigateByUrl('');
      return { type: Acts.LOGGED_IN_SUCCESS};
    })

  // @Effect() logout = this.actions.ofType(Acts.LOGGED_OUT)
  //   .map(action => {
  //     this.router.navigate(['login']);
  //     return action;
  //   })

  @Effect() updateItem = this.actions.ofType(Acts.UPDATE_ITEM)
    .switchMap(action => this.dynamo.updateDbItem((action as any).payload)
      .map((resp: DynamoDB.DocumentClient.UpdateItemOutput) => {
        const updatedItem = {
          environment: resp.Attributes['environment'],
          id: resp.Attributes['id'],
          lock: resp.Attributes['lock'],
          application: resp.Attributes['application'],
          variables: resp.Attributes['variables'],
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
        return { type: Acts.ITEM_DELETED, payload: id };
      })
      .catch(() => Observable.of({ type: Acts.ITEM_NOT_DELETED }))
    );

  // @Effect() getAllItems = this.actions.ofType(Acts.GET_ALL_ITEMS)
  //   .switchMap(() => this.dynamo.getAllItems()
  //     .map((resp: DynamoDB.DocumentClient.ScanOutput) => {
  //       // TODO does scanoutput really map to dbitem ok?
  //       return { type: Acts.ALL_ITEMS_GOT, payload: resp.Items }
  //     })
  //              .catch((e) => Observable.of({ type: Acts.ALL_ITEMS_NOT_GOT, payload: e}))
  //   );

  constructor(private router: Router,
    private actions: Actions,
    private store: Store<State>,
    private dynamo: DynamodbService) { }
}
