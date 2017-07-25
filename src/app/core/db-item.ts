export interface DbItem {
  id: number;
  vars: Var[];
  name: string;
  environment: string;
  lock: number;
}

export interface Var {
  key: string;
  value: string;
}
