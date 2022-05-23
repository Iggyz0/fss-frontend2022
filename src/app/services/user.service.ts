import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { JwttokenService } from './jwttoken.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  currentUser: User = new User();
  currentUsername = new BehaviorSubject<string>("");
  
  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private jwtTokenService: JwttokenService) { }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.currentUsername.next(this.currentUser.username);
  }

  getCurrentUserIdFromLocalStorage() {
    return this.localStorageService.getLocalStorageItem("username");
  }

  getUserById(id: string): User {
    this.getUserByIdFromTheServer(id).subscribe(result => {
      if (result != null) {
        this.currentUser = result;
        this.currentUsername.next(this.currentUser.username);
        return this.currentUser;
      }
      return new User();
    });
    return new User();
  }

  getUserByUsername(username: string): any {
    this.getUserByUsernameFromTheServer(username).subscribe(result => {
      
      if (result != null) {
        this.currentUser = result;
        this.currentUsername.next(this.currentUser.username);
        return this.currentUser;
      }
      else {
        return null;
      }
    });
  }

  getUserByIdFromTheServer(id: string): Observable<User> {
    return this.http.get<User>("http://localhost:8080/users/findbyid?id=" + id);
  }

  getUserByUsernameFromTheServer(username: string): Observable<User> {
    return this.http.get<User>("http://localhost:8080/users/findbyusername?username=" + username);
  }

}

// stack overflow

// return this.http.get(url, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token}) });

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     Authorization: 'my-auth-token'
//   })
// };

// httpOptions.headers =
//   httpOptions.headers.set('Authorization', 'my-new-auth-token');


// options: {
//   headers?: HttpHeaders | {[header: string]: string | string[]},
//   observe?: 'body' | 'events' | 'response',
//   params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
//   reportProgress?: boolean,
//   responseType?: 'arraybuffer'|'blob'|'json'|'text',
//   withCredentials?: boolean,
// }