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

export type AppState = {
  items: DbItem[],
  selected: DbItem
};
export type State = { app: AppState };

export const initialState: State = {
  app: {
    items: [
      {
        "id": "1243",
        "name": "kms-object-reps",
        "environment": "production",
        "vars": [
          { "key": "dns", "value": "bad" },
          { "key": "hello", "value": "world" },
          { "key": "carrots", "value": "orange" },
          { "key": "bananas", "value": "yellow" },
          { "key": "apples", "value": "red" },
          { "key": "dsn", "value": "database" },
          { "key": "pineapple", "value": "i dont know" },
          { "key": "mango", "value": "greenish redish" }
        ],
        "lock": 1
      },
      { "id": "1244", "name": "kms-object-reps", "environment": "staging", "vars": [{ "key": "vars", "value": "no" }], "lock": 1 },
      { "id": "124213", "name": "kms-api-event-registration", "environment": "production", "vars": [{ "key": "vars", "value": "yes" }], "lock": 1 },
      { "id": "12423", "name": "kms-api-event-registration", "environment": "staging", "vars": [{ "key": "vars", "value": "ok" }], "lock": 1 }
    ],
    selected: { "id": "12423", "name": "kms-api-event-registration", "environment": "staging", "vars": [{ "key": "vars", "value": "ok" }], "lock": 1 }
  }
};

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ITEMS_UPDATED": {
      return { items: { ...state.items, ...action.payload }, selected: state.selected };
    }
    case "ITEM_UPDATED": {
      const updatedItems = state.items.filter(i => i.id != action.payload.id);
      updatedItems.push(action.payload);
      return { items: updatedItems, selected: state.selected };
    }
    case "VAR_UPDATED": {
      let updatedItem = state.items.find(item => item.id == action.payload.id)
      const items = state.items.filter(item => item.id != action.payload.id) // get rid of item
      let updatedVars = updatedItem.vars.filter(item => item.key != action.payload.key) // get rid of var
      updatedVars.push({ key: action.payload.key, value: action.payload.value }) // add new var
      updatedItem.vars = updatedVars;
      items.push(updatedItem)
      /* updatedItem.vars[action.payload.key] = action.payload.value;
       * items[updatedItem.id] = updatedItem;*/
      return { items: items, selected: state.selected };
    }
    case "SELECT": {
      let found = state.items.find(item => item.id == action.payload.id);
      return { items: state.items, selected: found }
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
        return resp.Items;
      })
      .catch(() => Observable.of({ type: "ALL_ITEMS_NOT_GOT" }))
    );

  constructor(private actions: Actions, private store: Store<State>, private dynamo: DynamodbService) {
  }
}
