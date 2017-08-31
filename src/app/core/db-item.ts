export interface DbItem {
  id: string;
  variables: Var[];
  application: string;
  environment: string;
  lock: number;
}

export interface Var {
  name: string;
  value: string;
}
