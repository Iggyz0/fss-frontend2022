import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { JwttokenService } from './jwttoken.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private jwtTokenService: JwttokenService) { }

  loginUser(user: User): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/auth/login";

    return this.http.post<any>(url, user, { observe: 'response' });
  }

  registerUser(user: User): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/auth/createaccount";

    return this.http.post<any>(url, user);
  }

  isUserLoggedIn(): BehaviorSubject<boolean> {
    if (this.jwtTokenService.jwtToken != null) {
      this.logTheUserIn();
    }
    return this.isLoggedIn;
  }

  logTheUserIn() {
    this.isLoggedIn.next(true);
  }

  logTheUserOut() {
    this.isLoggedIn.next(false);
  }

  logout() {
    this.localStorageService.clearLocalStorageOnLogout();
    this.jwtTokenService.deleteToken();
    this.logTheUserOut();
  }
}