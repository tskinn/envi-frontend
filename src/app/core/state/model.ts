
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
      'name': 'kms-object-reps',
      'environment': 'production',
      'vars': [
        { 'key': 'dns', 'value': 'bad' },
        { 'key': 'hello', 'value': 'world' },
        { 'key': 'carrots', 'value': 'orange' },
        { 'key': 'bananas', 'value': 'yellow' },
        { 'key': 'apples', 'value': 'red' },
        { 'key': 'dsn', 'value': 'database' },
        { 'key': 'pineapple', 'value': 'i dont know' },
        { 'key': 'mango', 'value': 'greenish redish' }
      ],
      'lock': 1
    },
      {
      'id': '1244',
      'name': 'kms-object-reps',
      'environment': 'staging',
      'vars': [{ 'key': 'vars', 'value': 'no' }],
      'lock': 1
    },
      {
      'id': '124213',
      'name': 'kms-api-event-registration',
      'environment': 'production',
      'vars': [{ 'key': 'vars', 'value': 'yes' }],
      'lock': 1
    },
      {
      'id': '12423',
      'name': 'kms-api-event-registration',
      'environment': 'staging',
      'vars': [{ 'key': 'vars', 'value': 'ok' }],
      'lock': 1
    }
    ],
    selected: '1244'
  }
};

