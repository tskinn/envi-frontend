import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, combineReducers } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from './actions';
import { DbItem } from './db-item';
import { DynamodbService } from './dynamodb.service';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

export type AppState = { items: { [id: number]: DbItem } };
export type State = { app: AppState };

export const initialState: State = {
  app: {
    items: {}
  }
};

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ITEMS_UPDATED": {
      return { ...state, ...action.payload };
    }
    case "ITEM_UPDATED": {
      const items = { ...state.items };
      items[action.payload.id] = action.payload;
      return { ...state, items };
    }
    case "VAR_UPDATED": {
      const items = { ...state.items };
      let updatedItem = items[action.payload.id]
      updatedItem.vars[action.payload.key] = action.payload.value;
      items[updatedItem.id] = updatedItem;
      return { ...state, items };
    }
    default: {
      return state;
    }
  }
}

@Injectable()
export class ItemsEffects {
  @Effect() updateItem = this.actions.ofType("UPDATE_ITEM")
    .switchMap(action => this.dynamo.updateDbItem((action as any).payload)
      .map((resp: DynamoDB.DocumentClient.UpdateItemOutput) => {
        var updatedItem: DbItem;
        updatedItem.environment = resp.Attributes["environment"];
        updatedItem.id = resp.Attributes["id"];
        updatedItem.lock = resp.Attributes["lock"];
        updatedItem.name = resp.Attributes["name"];
        updatedItem.vars = resp.Attributes["vars"];
        // TODO just try returning resp.Attributes as the payload?
        return { type: "ITEM_UPDATED", payload: updatedItem };
      })
      .catch(() => Observable.of({ type: "ITEM_NOT_UPDATED" }))
    );
  // @Effect() varUpdated = this.action.ofType('UPDATE_VAR').switchMap()

  @Effect() deleteItem = this.actions.ofType("DELETE_ITEM")
    .switchMap(action => this.dynamo.deleteDbItem((action as any).payload.id)
      .map((resp: DynamoDB.DocumentClient.DeleteItemOutput) => {
        let id = resp.Attributes["id"];
        return { type: "ITEM_DELETED", payload: id };
      })
      .catch(() => Observable.of({ type: "ITEM_NOT_DELETED" }))
    );

  @Effect() getAllItems = this.actions.ofType("GET_ALL_ITEMS")
    .switchMap(() => this.dynamo.getAllItems()
      .map((resp: DynamoDB.DocumentClient.ScanOutput) => {
        resp.Items;
      })
      .catch(() => Observable.of({ type: "ALL_ITEMS_NOT_GOT" }))
    );

  constructor(private actions: Actions, private store: Store<State>, private dynamo: DynamodbService) {
  }
}
