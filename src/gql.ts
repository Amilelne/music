export type Maybe<T> = T | null;

/** input types user */
export interface CreateUserInput {
  name: string;

  role?: Maybe<string>;

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

    login: Login;
  };

  export type Login = {
    __typename?: "AuthPayload";

    token: string;

    user: User;
  };

  export type User = AuthFields.Fragment;
}

export namespace AuthRegister {
  export type Variables = {
    data: RegisterInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    register: Register;
  };

  export type Register = {
    __typename?: "AuthPayload";

    token: string;

    user: User;
  };

  export type User = AuthFields.Fragment;
}

export namespace AuthCurrentUser {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    me: Me;
  };

  export type Me = AuthFields.Fragment;
}

export namespace AuthFields {
  export type Fragment = {
    __typename?: "User";

    id: string;

    name: string;

    role: string;

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

  role: string;

  level: number;

  introduction?: Maybe<string>;

  avatar?: Maybe<Url>;
  /** timestamp */
  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;
}

export interface Mutation {
  addUser: User;

  register: AuthPayload;

  login: AuthPayload;
}

/** payload */
export interface AuthPayload {
  token: string;

  user: User;
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
// GraphQL Fragments
// ====================================================

export const AuthFieldsFragment = gql`
  fragment authFields on User {
    id
    name
    role
    level
  }
`;

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
      login(data: $data) {
        token
        user {
          ...authFields
        }
      }
    }

    ${AuthFieldsFragment}
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
      register(data: $data) {
        token
        user {
          ...authFields
        }
      }
    }

    ${AuthFieldsFragment}
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
        ...authFields
      }
    }

    ${AuthFieldsFragment}
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
