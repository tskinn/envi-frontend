import { ActionReducerMap } from '@ngrx/store';
import * as Actions from './actions';
import { AppState, State, initialState } from './model';

export type Action = Actions.All;

export function reducer(state: AppState, action: Action): AppState {
  console.log(state);
  console.log(action);
  switch (action.type) {
  case Actions.ALL_ITEMS_GOT: {
    state.items = action.payload;
    return {...state};
  }
  case Actions.ALL_ITEMS_NOT_GOT: {
    // TODO what is t?
    return state;
  }
  case Actions.ITEMS_UPDATED: {
    state.items = action.payload;
    return {...state};
  }
  case Actions.ITEM_UPDATED: {
    const i = state.items.findIndex(item => item.id == action.payload.id);
    state.items[i] = action.payload
    return {...state};
  }
  case Actions.ITEM_DELETED: {
    const filteredList = state.items.filter(item => item.id == action.payload.id);
    state.items = filteredList;
    return {...state};
  }
  case Actions.VAR_UPDATED: {
    const i = state.items.findIndex(item => item.id == action.payload.id);
    const j = state.items[i].vars.findIndex(v => v.key == action.payload.key);
    state.items[i].vars[j].value = action.payload.value;
    return {...state};
  }
  case Actions.LOGGED_IN: {
    return {...state, loggedIn: true};
  }
  case Actions.LOGGED_OUT: {
    return {...state, loggedIn: false};
  }
  case Actions.SELECTED: {
    return {...state, selected: action.payload}
  }
  default: {
    return state;
  }
  }
}

export const getItems = (state: State) => state.app.items;
export const getLoggedIn = (state: State) => state.app.loggedIn;
export const getSelected = (state: State) => state.app.selected;
