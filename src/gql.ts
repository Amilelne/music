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
/** input types */
export interface CreateCourseInput {
  title: string;

  description?: Maybe<string>;

  level?: Maybe<number>;

  price?: Maybe<number>;

  kind?: Maybe<(Maybe<number>)[]>;

  tutorials?: Maybe<(Maybe<CreateTutorialInput>)[]>;
}

export interface CreateTutorialInput {
  title: string;

  resourceUrl?: Maybe<string>;

  resourceType?: Maybe<number>;

  description: string;

  level: number;
}

/** custom url link */
export type Url = any;

/** custom scalar type */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace AdminCourses {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    courses: (Maybe<Courses>)[];
  };

  export type Courses = CourseFields.Fragment;
}

export namespace AdminCreateCourse {
  export type Variables = {
    data: CreateCourseInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addCourse: AddCourse;
  };

  export type AddCourse = CourseFields.Fragment;
}

export namespace AdminDeleteCourse {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteCourse: DeleteCourse;
  };

  export type DeleteCourse = CourseFields.Fragment;
}

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

export namespace CourseFields {
  export type Fragment = {
    __typename?: "Course";

    id: string;

    title: string;

    description: Maybe<string>;

    price: Maybe<number>;

    level: Maybe<number>;
  };
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
  /** course */
  courses: (Maybe<Course>)[];
  /** tutorial */
  tutorials: (Maybe<Tutorial>)[];
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

export interface Course {
  id: string;

  title: string;

  description?: Maybe<string>;

  level?: Maybe<number>;

  price?: Maybe<number>;

  tutorials?: Maybe<(Maybe<Tutorial>)[]>;
}

export interface Tutorial {
  id: string;

  title: string;

  resourceUrl?: Maybe<string>;

  resourceType?: Maybe<number>;

  description: string;

  level: number;

  participants?: Maybe<number>;

  likes?: Maybe<number>;
}

export interface Mutation {
  /** user */
  addUser: User;

  register: AuthPayload;

  login: AuthPayload;
  /** course */
  addCourse: Course;

  deleteCourse: Course;
  /** tutorial */
  addTutorial: Tutorial;

  deleteTutorial: Tutorial;
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
export interface AddCourseMutationArgs {
  data: CreateCourseInput;
}
export interface DeleteCourseMutationArgs {
  id: string;
}
export interface AddTutorialMutationArgs {
  data: CreateTutorialInput;
}
export interface DeleteTutorialMutationArgs {
  id: string;
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

export const CourseFieldsFragment = gql`
  fragment CourseFields on Course {
    id
    title
    description
    price
    level
  }
`;

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
export class AdminCoursesGQL extends Apollo.Query<
  AdminCourses.Query,
  AdminCourses.Variables
> {
  document: any = gql`
    query AdminCourses {
      courses {
        ...CourseFields
      }
    }

    ${CourseFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminCreateCourseGQL extends Apollo.Mutation<
  AdminCreateCourse.Mutation,
  AdminCreateCourse.Variables
> {
  document: any = gql`
    mutation AdminCreateCourse($data: CreateCourseInput!) {
      addCourse(data: $data) {
        ...CourseFields
      }
    }

    ${CourseFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminDeleteCourseGQL extends Apollo.Mutation<
  AdminDeleteCourse.Mutation,
  AdminDeleteCourse.Variables
> {
  document: any = gql`
    mutation AdminDeleteCourse($id: ID!) {
      deleteCourse(id: $id) {
        ...CourseFields
      }
    }

    ${CourseFieldsFragment}
  `;
}
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
