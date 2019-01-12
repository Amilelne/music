export type Maybe<T> = T | null;

/** input types user */
export interface CreateUserInput {
  name: string;

  role?: Maybe<number>;

  level?: Maybe<number>;

  introduction?: Maybe<string>;

  avatar?: Maybe<Url>;
}
/** new user register with name, identifier and credential */
export interface RegisterInput {
  name: string;

  identifier: string;

  credential: string;
}
/** login with identifier and credential */
export interface LoginInput {
  identifier: string;

  credential: string;
}

/** custom url link */
export type Url = any;

/** custom scalar type */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace AuthLogin {
  export type Variables = {
    data: LoginInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    login: string;
  };
}

export namespace AuthRegister {
  export type Variables = {
    data: RegisterInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    register: string;
  };
}

export namespace AuthCurrentUser {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    me: Me;
  };

  export type Me = {
    __typename?: "User";

    id: string;

    name: string;

    role: number;

    level: number;
  };
}

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  appName: string;

  me: User;
  /** get all users */
  users: (Maybe<User>)[];
}

export interface User {
  id: string;

  name: string;

  role: number;

  level: number;

  introduction?: Maybe<string>;

  avatar?: Maybe<Url>;
  /** timestamp */
  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;
}

export interface Mutation {
  addUser: User;

  register: string;

  login: string;
}

// ====================================================
// Arguments
// ====================================================

export interface AddUserMutationArgs {
  data: CreateUserInput;
}
export interface RegisterMutationArgs {
  data: RegisterInput;
}
export interface LoginMutationArgs {
  data: LoginInput;
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class AuthLoginGQL extends Apollo.Mutation<
  AuthLogin.Mutation,
  AuthLogin.Variables
> {
  document: any = gql`
    mutation AuthLogin($data: LoginInput!) {
      login(data: $data)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AuthRegisterGQL extends Apollo.Mutation<
  AuthRegister.Mutation,
  AuthRegister.Variables
> {
  document: any = gql`
    mutation AuthRegister($data: RegisterInput!) {
      register(data: $data)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AuthCurrentUserGQL extends Apollo.Query<
  AuthCurrentUser.Query,
  AuthCurrentUser.Variables
> {
  document: any = gql`
    query AuthCurrentUser {
      me {
        id
        name
        role
        level
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
