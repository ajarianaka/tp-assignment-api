export interface IEnv {
  stage?: string;
  port: number;
  domain: string;
  apiPath: string;
  staticPath: string;
  db: IMongoDBCfg;
}

export interface IMongoDBCfg {
  name: string;
  user: string;
  pw: string;
  account: string;
  uri: (user: string, pw: string, name: string, account: string) => string;
}