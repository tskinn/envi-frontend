export interface DbItem {
  id: string;
  vars: Var[];
  name: string;
  environment: string;
  lock: number;
}

export interface Var {
  key: string;
  value: string;
}
