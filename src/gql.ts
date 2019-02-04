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

export interface CreatePracticeInput {
  title: string;

  resourceUrl: string;

  resourceType: number;

  description?: Maybe<string>;

  level: number;
}

/** custom url link */
export type Url = any;

/** custom scalar type */
export type DateTime = any;

export type Upload = any;

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

export namespace AdminPractices {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    practices: (Maybe<Practices>)[];
  };

  export type Practices = {
    __typename?: "Practice";

    averageScore: Maybe<number>;
  } & PracticeFields.Fragment;
}

export namespace AdminCourseDetail {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    course: Course;
  };

  export type Course = {
    __typename?: "Course";

    tutorials: Maybe<(Maybe<Tutorials>)[]>;
  } & CourseFields.Fragment;

  export type Tutorials = TutorialFields.Fragment;
}

export namespace AdminPracticeDetail {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    practice: Practice;
  };

  export type Practice = {
    __typename?: "Practice";

    averageScore: Maybe<number>;
  } & PracticeFields.Fragment;
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

export namespace AdminCreateTutorial {
  export type Variables = {
    data: CreateTutorialInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addTutorial: AddTutorial;
  };

  export type AddTutorial = TutorialFields.Fragment;
}

export namespace AdminDeleteTutorial {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteTutorial: DeleteTutorial;
  };

  export type DeleteTutorial = TutorialFields.Fragment;
}

export namespace AdminUploadFile {
  export type Variables = {
    file: Upload;
  };

  export type Mutation = {
    __typename?: "Mutation";

    singleUpload: SingleUpload;
  };

  export type SingleUpload = {
    __typename?: "File";

    filename: string;

    mimetype: string;

    encoding: string;
  };
}

export namespace AdminCreatePractice {
  export type Variables = {
    data: CreatePracticeInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addPractice: AddPractice;
  };

  export type AddPractice = PracticeFields.Fragment;
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

    createDate: Maybe<DateTime>;

    updateDate: Maybe<DateTime>;
  };
}

export namespace TutorialFields {
  export type Fragment = {
    __typename?: "Tutorial";

    id: string;

    title: string;

    resourceType: Maybe<number>;

    resourceUrl: Maybe<string>;

    description: string;

    level: number;

    createDate: Maybe<DateTime>;

    updateDate: Maybe<DateTime>;
  };
}

export namespace PracticeFields {
  export type Fragment = {
    __typename?: "Practice";

    id: string;

    title: string;

    resourceType: number;

    resourceUrl: string;

    description: Maybe<string>;

    level: number;

    createDate: Maybe<DateTime>;

    updateDate: Maybe<DateTime>;
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

  user: User;
  /** course */
  courses: (Maybe<Course>)[];

  course: Course;
  /** tutorial */
  tutorials: (Maybe<Tutorial>)[];
  /** practice */
  practice: Practice;

  practices: (Maybe<Practice>)[];
  /** get uploaded files */
  uploads?: Maybe<(Maybe<File>)[]>;
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

  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;

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

  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;
}

export interface Practice {
  id: string;

  title: string;

  resourceUrl: string;

  resourceType: number;

  description?: Maybe<string>;

  averageScore?: Maybe<number>;

  level: number;

  participants?: Maybe<number>;

  likes?: Maybe<number>;

  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;
}

export interface File {
  filename: string;

  mimetype: string;

  encoding: string;
}

export interface Mutation {
  /** user */
  addUser: User;

  deleteUser: User;

  register: AuthPayload;

  login: AuthPayload;
  /** course */
  addCourse: Course;

  deleteCourse: Course;
  /** tutorial */
  addTutorial: Tutorial;

  deleteTutorial: Tutorial;
  /** practice */
  addPractice: Practice;

  deletePractice: Practice;
  /** upload file */
  singleUpload: File;
}

/** payload */
export interface AuthPayload {
  token: string;

  user: User;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: string;
}
export interface CourseQueryArgs {
  id: string;
}
export interface PracticeQueryArgs {
  id: string;
}
export interface AddUserMutationArgs {
  data: CreateUserInput;
}
export interface DeleteUserMutationArgs {
  id: string;
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
export interface AddPracticeMutationArgs {
  data: CreatePracticeInput;
}
export interface DeletePracticeMutationArgs {
  id: string;
}
export interface SingleUploadMutationArgs {
  file: Upload;
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
    createDate
    updateDate
  }
`;

export const TutorialFieldsFragment = gql`
  fragment TutorialFields on Tutorial {
    id
    title
    resourceType
    resourceUrl
    description
    level
    createDate
    updateDate
  }
`;

export const PracticeFieldsFragment = gql`
  fragment PracticeFields on Practice {
    id
    title
    resourceType
    resourceUrl
    description
    level
    createDate
    updateDate
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
export class AdminPracticesGQL extends Apollo.Query<
  AdminPractices.Query,
  AdminPractices.Variables
> {
  document: any = gql`
    query AdminPractices {
      practices {
        ...PracticeFields
        averageScore
      }
    }

    ${PracticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminCourseDetailGQL extends Apollo.Query<
  AdminCourseDetail.Query,
  AdminCourseDetail.Variables
> {
  document: any = gql`
    query AdminCourseDetail($id: ID!) {
      course(id: $id) {
        ...CourseFields
        tutorials {
          ...TutorialFields
        }
      }
    }

    ${CourseFieldsFragment}
    ${TutorialFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminPracticeDetailGQL extends Apollo.Query<
  AdminPracticeDetail.Query,
  AdminPracticeDetail.Variables
> {
  document: any = gql`
    query AdminPracticeDetail($id: ID!) {
      practice(id: $id) {
        ...PracticeFields
        averageScore
      }
    }

    ${PracticeFieldsFragment}
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
export class AdminCreateTutorialGQL extends Apollo.Mutation<
  AdminCreateTutorial.Mutation,
  AdminCreateTutorial.Variables
> {
  document: any = gql`
    mutation AdminCreateTutorial($data: CreateTutorialInput!) {
      addTutorial(data: $data) {
        ...TutorialFields
      }
    }

    ${TutorialFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminDeleteTutorialGQL extends Apollo.Mutation<
  AdminDeleteTutorial.Mutation,
  AdminDeleteTutorial.Variables
> {
  document: any = gql`
    mutation AdminDeleteTutorial($id: ID!) {
      deleteTutorial(id: $id) {
        ...TutorialFields
      }
    }

    ${TutorialFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminUploadFileGQL extends Apollo.Mutation<
  AdminUploadFile.Mutation,
  AdminUploadFile.Variables
> {
  document: any = gql`
    mutation AdminUploadFile($file: Upload!) {
      singleUpload(file: $file) {
        filename
        mimetype
        encoding
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminCreatePracticeGQL extends Apollo.Mutation<
  AdminCreatePractice.Mutation,
  AdminCreatePractice.Variables
> {
  document: any = gql`
    mutation AdminCreatePractice($data: CreatePracticeInput!) {
      addPractice(data: $data) {
        ...PracticeFields
      }
    }

    ${PracticeFieldsFragment}
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
