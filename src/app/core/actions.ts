import { Action } from '@ngrx/store';

import { DbItem } from './db-item';

// actions
export class ItemsUpdated implements Action {
  readonly type = "ITEMS_UPDATED";
  constructor(public payload: { [id: number]: DbItem }) { }
}
export class ItemUpdated implements Action {
  readonly type = "ITEM_UPDATED";
  constructor(public payload: DbItem) { }
}
export class VarUpdated implements Action {
  readonly type = "VAR_UPDATED";
  constructor(public payload: { id: number, key: string, value: string }) { }
}
export class ItemDeleted implements Action {
  readonly type = "ITEM_DELETED";
  constructor(public payload: { id: number }) { }
}
export class AllItemsGot implements Action {
  readonly type = "ALL_ITEMS_GOT";
  constructor(public payload: { [id: number]: DbItem }) { }
}
export class AllItemsNotGot implements Action {
  readonly type = "ALL_ITEMS_NOT_GOT";
  constructor() { }
}
/* export type ItemsUpdated = { type: "ITEMS_UPDATED", payload: { [id: number]: DbItem } };
 * export type ItemUpdated = { type: "ITEM_UPDATED", payload: DbItem };
 * export type VarUpdated = { type: "VAR_UPDATED", payload: { id: number, key: string, value: string } };
 * export type DeleteItem = { type: "DELETE_ITEM", payload: { id: number } };*/

export type Action = ItemsUpdated
  | ItemUpdated
  | VarUpdated
  | ItemDeleted
  | AllItemsGot
  | AllItemsNotGot;
