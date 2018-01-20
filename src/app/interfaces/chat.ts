export interface Chat {
  _id: string;
  theme: string;
  blacklist: string[];
  owner: string;
  messages: any[];
}
