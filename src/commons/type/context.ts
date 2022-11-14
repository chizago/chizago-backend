export interface IUser {
  user: {
    id: string;
    email: string;
  };
}

export interface IContext {
  req?: Request & IUser;
  res?: Response;
}

export interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    nickname: string;
  };
}

export interface IElasticSearch {
  hits: {
    hits: object[];
  };
}
