import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {UserInterface, UserSignUpInterface} from "../interfaces/user.interface";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public accessToken: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('_idToken'));
  private isLogin: boolean | undefined;

  constructor(private apiService: ApiService) { }

  singIn(user: UserInterface): Observable<{ token: string }> {
    return this.apiService.postApi('http://localhost:5005/auth/login', user)
      .pipe(
        tap(
          ({ token}) => {
            localStorage.setItem('_idToken', token);
            this.isLogin = true;
            this.accessToken.next('true');
          }
        )
      );
  }

  singUp(user: UserSignUpInterface): Observable<UserSignUpInterface> {
    return this.apiService.postApi('http://localhost:5005/auth/register', user);
  }

  getAccessToken(): string | null{
    return localStorage.getItem('_idToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('_idToken');
  }
}
