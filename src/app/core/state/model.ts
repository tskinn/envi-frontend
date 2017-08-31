
import { DbItem } from '../db-item';

export interface State {
  app: AppState;
}

export interface AppState {
  items: DbItem[];
  selected: string;
  loggedIn: boolean;
}

export const initialState: State = {
  app: {
    loggedIn: false,
    items: [
      {
      'id': '1243',
      'application': 'kms-object-reps',
      'environment': 'production',
      'variables': [
        { 'name': 'dns', 'value': 'bad' },
        { 'name': 'hello', 'value': 'world' },
        { 'name': 'carrots', 'value': 'orange' },
        { 'name': 'bananas', 'value': 'yellow' },
        { 'name': 'apples', 'value': 'red' },
        { 'name': 'dsn', 'value': 'database' },
        { 'name': 'pineapple', 'value': 'i dont know' },
        { 'name': 'mango', 'value': 'greenish redish' }
      ],
      'lock': 1
    },
      {
      'id': '1244',
      'application': 'kms-object-reps',
      'environment': 'staging',
      'variables': [{ 'name': 'vars', 'value': 'no' }],
      'lock': 1
    },
      {
      'id': '124213',
      'application': 'kms-api-event-registration',
      'environment': 'production',
      'variables': [{ 'name': 'vars', 'value': 'yes' }],
      'lock': 1
    },
      {
      'id': '12423',
      'application': 'kms-api-event-registration',
      'environment': 'staging',
      'variables': [{ 'name': 'vars', 'value': 'ok' }],
      'lock': 1
    }
    ],
    selected: '1244'
  }
};

