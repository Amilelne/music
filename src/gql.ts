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

  pictureUrl?: Maybe<string>;

  createId: string;
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

  abcUrl: string;

  description?: Maybe<string>;

  level: number;

  kind: number;
}
/** input type */
export interface UploadAudioInput {
  file: Upload;

  userId: string;

  practiceId: string;

  practiceTitle: string;

  abcUrl: string;
}

export interface ScoreRecordInput {
  id: string;

  expertId: string;

  expertBeatScore: number;

  expertIntonationScore: number;
}
/** update profile */
export interface UpdateProfileInput {
  name?: Maybe<string>;

  email?: Maybe<string>;

  work?: Maybe<string>;

  city?: Maybe<string>;

  sex?: Maybe<number>;

  introduction?: Maybe<string>;
}
/** input types */
export interface CreateNoticeInput {
  sendId: string;

  userId?: Maybe<string>;

  userRole?: Maybe<string>;

  practiceId: string;

  audioId: string;

  content: string;
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
  export type Variables = {
    pageIndex?: Maybe<number>;
    pageSize?: Maybe<number>;
    kind?: Maybe<number>;
    createId?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    courses: (Maybe<Courses>)[];
  };

  export type Courses = CourseFields.Fragment;
}

export namespace CoursesCount {
  export type Variables = {
    kind?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    coursesCount: number;
  };
}

export namespace AdminPractices {
  export type Variables = {
    pageIndex?: Maybe<number>;
    pageSize?: Maybe<number>;
    kind?: Maybe<number>;
    level?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    practices: (Maybe<Practices>)[];
  };

  export type Practices = {
    __typename?: "Practice";

    averageScore: Maybe<number>;
  } & PracticeFields.Fragment;
}

export namespace PracticesCount {
  export type Variables = {
    kind?: Maybe<number>;
    level?: Maybe<number>;
  };

  export type Query = {
    __typename?: "Query";

    practicesCount: number;
  };
}

export namespace AdminCourseNumberByKind {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    courseNumberByKind: (Maybe<number>)[];
  };
}

export namespace AdminPracticeNumberByKind {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    practiceNumberByKind: (Maybe<number>)[];
  };
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

export namespace TutorialDetail {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    tutorial: Tutorial;
  };

  export type Tutorial = TutorialFields.Fragment;
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
    id?: Maybe<string>;
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

export namespace AdminAbcUpload {
  export type Variables = {
    file: Upload;
  };

  export type Mutation = {
    __typename?: "Mutation";

    abcUpload: AbcUpload;
  };

  export type AbcUpload = {
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

export namespace AdminDeletePractice {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deletePractice: DeletePractice;
  };

  export type DeletePractice = PracticeFields.Fragment;
}

export namespace AdminUpdateCoursePicture {
  export type Variables = {
    id: string;
    file: Upload;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateCoursePicture: UpdateCoursePicture;
  };

  export type UpdateCoursePicture = {
    __typename?: "Course";

    id: string;

    pictureUrl: Maybe<string>;
  };
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

  export type Me = {
    __typename?: "User";

    avatar: Maybe<Url>;
  } & AuthFields.Fragment;
}

export namespace AdminUsers {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    users: (Maybe<Users>)[];
  };

  export type Users = {
    __typename?: "User";

    createDate: Maybe<DateTime>;

    updateDate: Maybe<DateTime>;
  } & UserFields.Fragment;
}

export namespace AdminUserById {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    user: User;
  };

  export type User = {
    __typename?: "User";

    createDate: Maybe<DateTime>;

    updateDate: Maybe<DateTime>;
  } & UserFields.Fragment;
}

export namespace AdminUpdateUserRole {
  export type Variables = {
    userId: string;
    userRole: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    adminUpdateUserRole: boolean;
  };
}

export namespace AdminDeleteUserById {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteUser: DeleteUser;
  };

  export type DeleteUser = UserFields.Fragment;
}

export namespace UpdateAvatar {
  export type Variables = {
    userId: string;
    file: Upload;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateAvatar: UpdateAvatar;
  };

  export type UpdateAvatar = UserProfile.Fragment;
}

export namespace UpdateProfile {
  export type Variables = {
    userId: string;
    data: UpdateProfileInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateProfile: UpdateProfile;
  };

  export type UpdateProfile = {
    __typename?: "User";

    work: Maybe<string>;

    city: Maybe<string>;

    sex: Maybe<number>;
  } & UserProfile.Fragment;
}

export namespace UserRecords {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";

    userRecords: (Maybe<UserRecords>)[];
  };

  export type UserRecords = ScoreFields.Fragment;
}

export namespace Record {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    record: Record;
  };

  export type Record = ScoreFields.Fragment;
}

export namespace Records {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    records: (Maybe<Records>)[];
  };

  export type Records = ScoreFields.Fragment;
}

export namespace UnscoredRecords {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    unscoredRecords: (Maybe<UnscoredRecords>)[];
  };

  export type UnscoredRecords = ScoreFields.Fragment;
}

export namespace UploadRecord {
  export type Variables = {
    data: UploadAudioInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    uploadRecord: UploadRecord;
  };

  export type UploadRecord = ScoreFields.Fragment;
}

export namespace ScoreRecord {
  export type Variables = {
    data: ScoreRecordInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    scoreRecord: boolean;
  };
}

export namespace Experts {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    experts: (Maybe<Experts>)[];
  };

  export type Experts = ExpertFields.Fragment;
}

export namespace Expert {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    expert: Expert;
  };

  export type Expert = ExpertFields.Fragment;
}

export namespace Notice {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    notice: Notice;
  };

  export type Notice = NoticeFields.Fragment;
}

export namespace NoticesToUser {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";

    noticesToUser: (Maybe<NoticesToUser>)[];
  };

  export type NoticesToUser = NoticeFields.Fragment;
}

export namespace UnreadNoticesToUser {
  export type Variables = {
    userId: string;
    userRole: string;
  };

  export type Query = {
    __typename?: "Query";

    unreadNoticesToUser: (Maybe<UnreadNoticesToUser>)[];
  };

  export type UnreadNoticesToUser = NoticeFields.Fragment;
}

export namespace NoticesToGroup {
  export type Variables = {
    userRole: string;
  };

  export type Query = {
    __typename?: "Query";

    noticesToGroup: (Maybe<NoticesToGroup>)[];
  };

  export type NoticesToGroup = NoticeFields.Fragment;
}

export namespace UnreadNoticesToGroup {
  export type Variables = {
    userRole: string;
  };

  export type Query = {
    __typename?: "Query";

    unreadNoticesToGroup: (Maybe<UnreadNoticesToGroup>)[];
  };

  export type UnreadNoticesToGroup = NoticeFields.Fragment;
}

export namespace NoticesSend {
  export type Variables = {
    sendId: string;
  };

  export type Query = {
    __typename?: "Query";

    noticesSend: (Maybe<NoticesSend>)[];
  };

  export type NoticesSend = NoticeFields.Fragment;
}

export namespace SendNotice {
  export type Variables = {
    data: CreateNoticeInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    sendNotice: SendNotice;
  };

  export type SendNotice = NoticeFields.Fragment;
}

export namespace ReadNotice {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    readNotice: boolean;
  };
}

export namespace DeleteNotice {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteNotice: boolean;
  };
}

export namespace CourseFields {
  export type Fragment = {
    __typename?: "Course";

    id: string;

    title: string;

    description: Maybe<string>;

    price: Maybe<number>;

    level: Maybe<number>;

    kind: Maybe<(Maybe<number>)[]>;

    pictureUrl: Maybe<string>;

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

    abcUrl: string;

    description: Maybe<string>;

    level: number;

    kind: number;

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

    avatar: Maybe<Url>;

    work: Maybe<string>;

    city: Maybe<string>;

    introduction: Maybe<string>;
  };
}

export namespace UserFields {
  export type Fragment = {
    __typename?: "User";

    id: string;

    name: string;

    role: string;

    level: number;

    introduction: Maybe<string>;

    avatar: Maybe<Url>;
  };
}

export namespace UserProfile {
  export type Fragment = {
    __typename?: "User";

    id: string;

    name: string;

    avatar: Maybe<Url>;

    role: string;

    level: number;
  };
}

export namespace RecordFields {
  export type Fragment = {
    __typename?: "Record";

    id: string;

    userId: string;

    practiceId: string;

    practiceTitle: string;

    audioUrl: Maybe<string>;

    updateDate: Maybe<DateTime>;
  };
}

export namespace ScoreFields {
  export type Fragment = {
    __typename?: "Record";

    id: string;

    userId: string;

    practiceId: string;

    practiceTitle: string;

    audioUrl: Maybe<string>;

    AIBeatScore: Maybe<number>;

    AIIntonationScore: Maybe<number>;

    AITotalScore: Maybe<number>;

    expertId: Maybe<string>;

    expertBeatScore: Maybe<number>;

    expertIntonationScore: Maybe<number>;

    expertTotalScore: Maybe<number>;

    createDate: Maybe<DateTime>;

    updateDate: Maybe<DateTime>;

    faultImageUrl: Maybe<string>;
  };
}

export namespace ExpertFields {
  export type Fragment = {
    __typename?: "User";

    id: string;

    name: string;

    role: string;

    level: number;

    introduction: Maybe<string>;

    avatar: Maybe<Url>;
  };
}

export namespace NoticeFields {
  export type Fragment = {
    __typename?: "Notice";

    id: string;

    sendId: string;

    userId: Maybe<string>;

    practiceId: string;

    audioId: string;

    read: boolean;

    content: string;

    createDate: Maybe<DateTime>;
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
  /** get all experts */
  experts: (Maybe<User>)[];

  expert: User;
  /** course */
  courses: (Maybe<Course>)[];

  coursesCount: number;

  course: Course;

  courseNumberByKind: (Maybe<number>)[];
  /** tutorial */
  tutorial: Tutorial;

  tutorials: (Maybe<Tutorial>)[];
  /** practice */
  practice: Practice;

  practices: (Maybe<Practice>)[];

  practicesCount: number;

  recommendPractices: (Maybe<Practice>)[];

  practiceNumberByKind: (Maybe<number>)[];
  /** record */
  record: Record;

  userRecords: (Maybe<Record>)[];

  records: (Maybe<Record>)[];

  unscoredRecords: (Maybe<Record>)[];
  /** notice */
  notice: Notice;

  noticesToUser: (Maybe<Notice>)[];

  unreadNoticesToUser: (Maybe<Notice>)[];

  noticesToGroup: (Maybe<Notice>)[];

  unreadNoticesToGroup: (Maybe<Notice>)[];

  noticesSend: (Maybe<Notice>)[];
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

  work?: Maybe<string>;

  city?: Maybe<string>;

  sex?: Maybe<number>;
  /** timestamp */
  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;
}

export interface Course {
  id: string;

  title: string;

  description?: Maybe<string>;

  level?: Maybe<number>;

  kind?: Maybe<(Maybe<number>)[]>;

  price?: Maybe<number>;

  pictureUrl?: Maybe<string>;

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

  abcUrl: string;

  description?: Maybe<string>;

  averageScore?: Maybe<number>;

  level: number;

  kind: number;

  participants?: Maybe<number>;

  likes?: Maybe<number>;

  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;
}

export interface Record {
  id: string;

  userId: string;

  practiceId: string;

  practiceTitle: string;

  audioUrl?: Maybe<string>;

  AIBeatScore?: Maybe<number>;

  AIIntonationScore?: Maybe<number>;

  AITotalScore?: Maybe<number>;

  expertId?: Maybe<string>;

  expertBeatScore?: Maybe<number>;

  expertIntonationScore?: Maybe<number>;

  expertTotalScore?: Maybe<number>;

  createDate?: Maybe<DateTime>;

  updateDate?: Maybe<DateTime>;

  faultImageUrl?: Maybe<string>;
}

export interface Notice {
  id: string;

  sendId: string;

  userId?: Maybe<string>;

  userRole?: Maybe<string>;

  practiceId: string;

  audioId: string;

  read: boolean;

  content: string;

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

  adminUpdateUserRole: boolean;
  /** course */
  addCourse: Course;

  deleteCourse: Course;

  updateCoursePicture: Course;
  /** tutorial */
  addTutorial: Tutorial;

  deleteTutorial: Tutorial;
  /** practice */
  addPractice: Practice;

  deletePractice: Practice;
  /** upload file */
  singleUpload: File;
  /** upload practice abc file */
  abcUpload: File;
  /** upload record */
  uploadRecord: Record;
  /** score record */
  scoreRecord: boolean;
  /** update avatar */
  updateAvatar: User;
  /** update profile */
  updateProfile: User;
  /** send notice */
  sendNotice: Notice;

  readNotice: boolean;

  deleteNotice: boolean;
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
export interface ExpertQueryArgs {
  id: string;
}
export interface CoursesQueryArgs {
  pageIndex?: Maybe<number>;

  pageSize?: Maybe<number>;

  kind?: Maybe<number>;

  createId: string;
}
export interface CoursesCountQueryArgs {
  kind?: Maybe<number>;
}
export interface CourseQueryArgs {
  id: string;
}
export interface TutorialQueryArgs {
  id: string;
}
export interface PracticeQueryArgs {
  id: string;
}
export interface PracticesQueryArgs {
  pageIndex?: Maybe<number>;

  pageSize?: Maybe<number>;

  kind?: Maybe<number>;

  level?: Maybe<number>;
}
export interface PracticesCountQueryArgs {
  kind?: Maybe<number>;

  level?: Maybe<number>;
}
export interface RecommendPracticesQueryArgs {
  id: string;
}
export interface RecordQueryArgs {
  id: string;
}
export interface UserRecordsQueryArgs {
  userId: string;
}
export interface NoticeQueryArgs {
  id: string;
}
export interface NoticesToUserQueryArgs {
  userId: string;
}
export interface UnreadNoticesToUserQueryArgs {
  userId: string;

  userRole: string;
}
export interface NoticesToGroupQueryArgs {
  userRole: string;
}
export interface UnreadNoticesToGroupQueryArgs {
  userRole: string;
}
export interface NoticesSendQueryArgs {
  sendId: string;
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
export interface AdminUpdateUserRoleMutationArgs {
  userId: string;

  userRole: string;
}
export interface AddCourseMutationArgs {
  data: CreateCourseInput;
}
export interface DeleteCourseMutationArgs {
  id: string;
}
export interface UpdateCoursePictureMutationArgs {
  id: string;

  file: Upload;
}
export interface AddTutorialMutationArgs {
  data: CreateTutorialInput;

  id?: Maybe<string>;
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
export interface AbcUploadMutationArgs {
  file: Upload;
}
export interface UploadRecordMutationArgs {
  data: UploadAudioInput;
}
export interface ScoreRecordMutationArgs {
  data: ScoreRecordInput;
}
export interface UpdateAvatarMutationArgs {
  userId: string;

  file: Upload;
}
export interface UpdateProfileMutationArgs {
  userId: string;

  data: UpdateProfileInput;
}
export interface SendNoticeMutationArgs {
  data: CreateNoticeInput;
}
export interface ReadNoticeMutationArgs {
  id: string;
}
export interface DeleteNoticeMutationArgs {
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
    kind
    pictureUrl
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
    abcUrl
    description
    level
    kind
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
    avatar
    work
    city
    introduction
  }
`;

export const UserFieldsFragment = gql`
  fragment UserFields on User {
    id
    name
    role
    level
    introduction
    avatar
  }
`;

export const UserProfileFragment = gql`
  fragment userProfile on User {
    id
    name
    avatar
    role
    level
  }
`;

export const RecordFieldsFragment = gql`
  fragment recordFields on Record {
    id
    userId
    practiceId
    practiceTitle
    audioUrl
    updateDate
  }
`;

export const ScoreFieldsFragment = gql`
  fragment scoreFields on Record {
    id
    userId
    practiceId
    practiceTitle
    audioUrl
    AIBeatScore
    AIIntonationScore
    AITotalScore
    expertId
    expertBeatScore
    expertIntonationScore
    expertTotalScore
    createDate
    updateDate
    faultImageUrl
  }
`;

export const ExpertFieldsFragment = gql`
  fragment ExpertFields on User {
    id
    name
    role
    level
    introduction
    avatar
  }
`;

export const NoticeFieldsFragment = gql`
  fragment NoticeFields on Notice {
    id
    sendId
    userId
    practiceId
    audioId
    read
    content
    createDate
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
    query AdminCourses(
      $pageIndex: Int = null
      $pageSize: Int = null
      $kind: Int = null
      $createId: ID = null
    ) {
      courses(
        pageIndex: $pageIndex
        pageSize: $pageSize
        kind: $kind
        createId: $createId
      ) {
        ...CourseFields
      }
    }

    ${CourseFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class CoursesCountGQL extends Apollo.Query<
  CoursesCount.Query,
  CoursesCount.Variables
> {
  document: any = gql`
    query CoursesCount($kind: Int = null) {
      coursesCount(kind: $kind)
    }
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
    query AdminPractices(
      $pageIndex: Int = null
      $pageSize: Int = null
      $kind: Int
      $level: Int
    ) {
      practices(
        pageIndex: $pageIndex
        pageSize: $pageSize
        kind: $kind
        level: $level
      ) {
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
export class PracticesCountGQL extends Apollo.Query<
  PracticesCount.Query,
  PracticesCount.Variables
> {
  document: any = gql`
    query PracticesCount($kind: Int, $level: Int) {
      practicesCount(kind: $kind, level: $level)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminCourseNumberByKindGQL extends Apollo.Query<
  AdminCourseNumberByKind.Query,
  AdminCourseNumberByKind.Variables
> {
  document: any = gql`
    query AdminCourseNumberByKind {
      courseNumberByKind
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminPracticeNumberByKindGQL extends Apollo.Query<
  AdminPracticeNumberByKind.Query,
  AdminPracticeNumberByKind.Variables
> {
  document: any = gql`
    query AdminPracticeNumberByKind {
      practiceNumberByKind
    }
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
export class TutorialDetailGQL extends Apollo.Query<
  TutorialDetail.Query,
  TutorialDetail.Variables
> {
  document: any = gql`
    query TutorialDetail($id: ID!) {
      tutorial(id: $id) {
        ...TutorialFields
      }
    }

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
    mutation AdminCreateTutorial($data: CreateTutorialInput!, $id: ID) {
      addTutorial(data: $data, id: $id) {
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
export class AdminAbcUploadGQL extends Apollo.Mutation<
  AdminAbcUpload.Mutation,
  AdminAbcUpload.Variables
> {
  document: any = gql`
    mutation AdminAbcUpload($file: Upload!) {
      abcUpload(file: $file) {
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
export class AdminDeletePracticeGQL extends Apollo.Mutation<
  AdminDeletePractice.Mutation,
  AdminDeletePractice.Variables
> {
  document: any = gql`
    mutation AdminDeletePractice($id: ID!) {
      deletePractice(id: $id) {
        ...PracticeFields
      }
    }

    ${PracticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminUpdateCoursePictureGQL extends Apollo.Mutation<
  AdminUpdateCoursePicture.Mutation,
  AdminUpdateCoursePicture.Variables
> {
  document: any = gql`
    mutation AdminUpdateCoursePicture($id: ID!, $file: Upload!) {
      updateCoursePicture(id: $id, file: $file) {
        id
        pictureUrl
      }
    }
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
        avatar
      }
    }

    ${AuthFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminUsersGQL extends Apollo.Query<
  AdminUsers.Query,
  AdminUsers.Variables
> {
  document: any = gql`
    query AdminUsers {
      users {
        ...UserFields
        createDate
        updateDate
      }
    }

    ${UserFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminUserByIdGQL extends Apollo.Query<
  AdminUserById.Query,
  AdminUserById.Variables
> {
  document: any = gql`
    query AdminUserById($id: ID!) {
      user(id: $id) {
        ...UserFields
        createDate
        updateDate
      }
    }

    ${UserFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminUpdateUserRoleGQL extends Apollo.Mutation<
  AdminUpdateUserRole.Mutation,
  AdminUpdateUserRole.Variables
> {
  document: any = gql`
    mutation AdminUpdateUserRole($userId: ID!, $userRole: String!) {
      adminUpdateUserRole(userId: $userId, userRole: $userRole)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AdminDeleteUserByIdGQL extends Apollo.Mutation<
  AdminDeleteUserById.Mutation,
  AdminDeleteUserById.Variables
> {
  document: any = gql`
    mutation AdminDeleteUserById($id: ID!) {
      deleteUser(id: $id) {
        ...UserFields
      }
    }

    ${UserFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpdateAvatarGQL extends Apollo.Mutation<
  UpdateAvatar.Mutation,
  UpdateAvatar.Variables
> {
  document: any = gql`
    mutation UpdateAvatar($userId: ID!, $file: Upload!) {
      updateAvatar(userId: $userId, file: $file) {
        ...userProfile
      }
    }

    ${UserProfileFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpdateProfileGQL extends Apollo.Mutation<
  UpdateProfile.Mutation,
  UpdateProfile.Variables
> {
  document: any = gql`
    mutation UpdateProfile($userId: ID!, $data: UpdateProfileInput!) {
      updateProfile(userId: $userId, data: $data) {
        ...userProfile
        work
        city
        sex
      }
    }

    ${UserProfileFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UserRecordsGQL extends Apollo.Query<
  UserRecords.Query,
  UserRecords.Variables
> {
  document: any = gql`
    query UserRecords($userId: ID!) {
      userRecords(userId: $userId) {
        ...scoreFields
      }
    }

    ${ScoreFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class RecordGQL extends Apollo.Query<Record.Query, Record.Variables> {
  document: any = gql`
    query Record($id: ID!) {
      record(id: $id) {
        ...scoreFields
      }
    }

    ${ScoreFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class RecordsGQL extends Apollo.Query<Records.Query, Records.Variables> {
  document: any = gql`
    query Records {
      records {
        ...scoreFields
      }
    }

    ${ScoreFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UnscoredRecordsGQL extends Apollo.Query<
  UnscoredRecords.Query,
  UnscoredRecords.Variables
> {
  document: any = gql`
    query UnscoredRecords {
      unscoredRecords {
        ...scoreFields
      }
    }

    ${ScoreFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UploadRecordGQL extends Apollo.Mutation<
  UploadRecord.Mutation,
  UploadRecord.Variables
> {
  document: any = gql`
    mutation UploadRecord($data: UploadAudioInput!) {
      uploadRecord(data: $data) {
        ...scoreFields
      }
    }

    ${ScoreFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ScoreRecordGQL extends Apollo.Mutation<
  ScoreRecord.Mutation,
  ScoreRecord.Variables
> {
  document: any = gql`
    mutation ScoreRecord($data: ScoreRecordInput!) {
      scoreRecord(data: $data)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ExpertsGQL extends Apollo.Query<Experts.Query, Experts.Variables> {
  document: any = gql`
    query Experts {
      experts {
        ...ExpertFields
      }
    }

    ${ExpertFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ExpertGQL extends Apollo.Query<Expert.Query, Expert.Variables> {
  document: any = gql`
    query Expert($id: ID!) {
      expert(id: $id) {
        ...ExpertFields
      }
    }

    ${ExpertFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class NoticeGQL extends Apollo.Query<Notice.Query, Notice.Variables> {
  document: any = gql`
    query Notice($id: ID!) {
      notice(id: $id) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class NoticesToUserGQL extends Apollo.Query<
  NoticesToUser.Query,
  NoticesToUser.Variables
> {
  document: any = gql`
    query NoticesToUser($userId: ID!) {
      noticesToUser(userId: $userId) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UnreadNoticesToUserGQL extends Apollo.Query<
  UnreadNoticesToUser.Query,
  UnreadNoticesToUser.Variables
> {
  document: any = gql`
    query UnreadNoticesToUser($userId: ID!, $userRole: String!) {
      unreadNoticesToUser(userId: $userId, userRole: $userRole) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class NoticesToGroupGQL extends Apollo.Query<
  NoticesToGroup.Query,
  NoticesToGroup.Variables
> {
  document: any = gql`
    query NoticesToGroup($userRole: String!) {
      noticesToGroup(userRole: $userRole) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class UnreadNoticesToGroupGQL extends Apollo.Query<
  UnreadNoticesToGroup.Query,
  UnreadNoticesToGroup.Variables
> {
  document: any = gql`
    query UnreadNoticesToGroup($userRole: String!) {
      unreadNoticesToGroup(userRole: $userRole) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class NoticesSendGQL extends Apollo.Query<
  NoticesSend.Query,
  NoticesSend.Variables
> {
  document: any = gql`
    query NoticesSend($sendId: ID!) {
      noticesSend(sendId: $sendId) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class SendNoticeGQL extends Apollo.Mutation<
  SendNotice.Mutation,
  SendNotice.Variables
> {
  document: any = gql`
    mutation SendNotice($data: CreateNoticeInput!) {
      sendNotice(data: $data) {
        ...NoticeFields
      }
    }

    ${NoticeFieldsFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ReadNoticeGQL extends Apollo.Mutation<
  ReadNotice.Mutation,
  ReadNotice.Variables
> {
  document: any = gql`
    mutation ReadNotice($id: ID!) {
      readNotice(id: $id)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class DeleteNoticeGQL extends Apollo.Mutation<
  DeleteNotice.Mutation,
  DeleteNotice.Variables
> {
  document: any = gql`
    mutation DeleteNotice($id: ID!) {
      deleteNotice(id: $id)
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
