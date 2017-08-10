import { Action } from '@ngrx/store';

import { DbItem } from '../db-item';

export const ITEMS_UPDATED = '[DB] Items updated';
export const UPDATE_ITEM = '[DB] Update item';
export const ITEM_UPDATED = '[DB] Item update success';
export const ITEM_NOT_UPDATED = '[DB] Item update fail'
export const VAR_UPDATED =  '[DB] Var updated';
export const DELETE_ITEM = '[DB] Delete item';
export const ITEM_DELETED = '[DB] Item delete success';
export const ITEM_NOT_DELETED = '[DB] Item delete fail'
export const GET_ALL_ITEMS = '[DB] Retreive items';
export const ALL_ITEMS_GOT = '[DB] Retrieve items success';
export const ALL_ITEMS_NOT_GOT = '[DB] Retreive items fail';
export const SELECTED = '[UI] Selected item';
export const LOGGED_IN = '[Local] Logged in';
export const LOGGED_OUT = '[Local] Logged out';

// actions
export class ItemsUpdated implements Action {
  readonly type = ITEMS_UPDATED;
  constructor(public payload: DbItem[]) { }
}
export class ItemUpdated implements Action {
  readonly type = ITEM_UPDATED;
  constructor(public payload: DbItem) { }
}
export class VarUpdated implements Action {
  readonly type = VAR_UPDATED;
  constructor(public payload: { id: string, key: string, value: string }) { }
}
export class ItemDeleted implements Action {
  readonly type = ITEM_DELETED;
  constructor(public payload: { id: string }) { }
}
export class AllItemsGot implements Action {
  readonly type = ALL_ITEMS_GOT;
  constructor(public payload: DbItem[]) { }
}
export class AllItemsNotGot implements Action {
  readonly type = ALL_ITEMS_NOT_GOT;
  constructor() { }
}
export class Select implements Action {
  readonly type = SELECTED;
  constructor(public payload: string) { }
}
export class LoggedIn implements Action {
  readonly type = LOGGED_IN;
}
export class LoggedOut implements Action {
  readonly type = LOGGED_OUT;
}

export type All = ItemsUpdated
  | ItemUpdated
  | VarUpdated
  | ItemDeleted
  | AllItemsGot
  | AllItemsNotGot
  | Select
  | LoggedIn
  | LoggedOut;
