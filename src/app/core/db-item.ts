export interface DbItem {
  id: number;
  vars: { [key: string]: string; };
  name: string;
  environment: string;
  lock: number;
}
