import { Injectable } from "@angular/core";
import {
  AuthLoginGQL,
  LoginInput,
  RegisterInput,
  AuthRegisterGQL,
  User,
  AuthCurrentUserGQL
} from "@app/gql";
import { BehaviorSubject, throwError, of, Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public static AUTH_TOKEN_LOCAL_STORAGE_KEY = "authToken";
  isLoggedIn$ = new BehaviorSubject<boolean>(null);

  public _user: BehaviorSubject<User>;

  get user(): Observable<User> {
    return this._user.asObservable();
  }

  constructor(
    private loginGQL: AuthLoginGQL,
    private registerGQL: AuthRegisterGQL,
    private currentUserGQL: AuthCurrentUserGQL,
    private router: Router
  ) {
    this._user = new BehaviorSubject<User>(null);
    if (AuthService.getToken()) {
      this.currentUserGQL.fetch().subscribe(
        ({ data: { me } }) => {
          this.setUser(me);
        },
        () => {
          AuthService.removeToken();
          this.isLoggedIn$.next(false);
        }
      );
    } else {
      this.isLoggedIn$.next(false);
    }
  }

  static storeToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
  }

  static getToken() {
    return localStorage.getItem(this.AUTH_TOKEN_LOCAL_STORAGE_KEY);
  }

  static removeToken() {
    return localStorage.removeItem(this.AUTH_TOKEN_LOCAL_STORAGE_KEY);
  }

  private setUser(user: User) {
    this._user.next(user);
    this.isLoggedIn$.next(!!user);
  }

  // login
  login(loginInput: LoginInput) {
    // if there is a token, remove it
    AuthService.removeToken();
    return this.loginGQL
      .mutate(
        { data: loginInput },
        { errorPolicy: "all", fetchPolicy: "no-cache" }
      )
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            return throwError(errors);
          } else {
            return of(data);
          }
        }),
        tap(({ login: { token, user } }) => {
          AuthService.storeToken(token);
          this.isLoggedIn$.next(true);
          this.setUser(user);
        })
      );
  }
  // register
  register(registerInput: RegisterInput) {
    // if there is a token, remove it
    AuthService.removeToken();
    return this.registerGQL
      .mutate(
        { data: registerInput },
        { errorPolicy: "all", fetchPolicy: "no-cache" }
      )
      .pipe(
        mergeMap(({ data, errors }) => {
          if (errors) {
            return throwError(errors);
          } else {
            return of(data);
          }
        }),
        tap(({ register: { token, user } }) => {
          AuthService.storeToken(token);
          this.setUser(user);
        })
      );
  }

  // logout
  logout() {
    this.setUser(null);
    AuthService.removeToken();
    this.router.navigate(["/login"]);
  }

  // get user info
  getCurrentUser(): Observable<any> {
    let user: User;
    this.currentUserGQL.fetch().subscribe(({ data: { me } }) => {
      user = me;
    });
    return of(user);
  }
}
