import { Injectable } from '@angular/core';
import {
  AuthLoginGQL,
  LoginInput,
  RegisterInput,
  AuthRegisterGQL
} from '@app/gql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private loginGQL: AuthLoginGQL,
    private registerGQL: AuthRegisterGQL
  ) {}

  login(loginInput: LoginInput) {
    return this.loginGQL.mutate({ data: loginInput });
  }

  register(registerInput: RegisterInput) {
    return this.registerGQL.mutate({ data: registerInput });
  }
}
