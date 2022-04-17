import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {

  constructor() { }

  jwtToken?: string | null;
  decodedToken?: { [key: string]: string };
  user: User = {
    id: '',
    username : ''
  }

  setToken(token: string | null) {
    if (token != null) {
      this.jwtToken = token;

      this.decodeToken();
      let tok = this.decodedToken!.sub.split(","); // splitujemo sub property koji je oblika '6dsafsajfhafasf,username' u niz stringova
      this.setUserObject(tok[0], tok[1]); // prvi string je id user-a, drugi je username
    }
  }

  setUserObject(id: string, username: string) {
    this.user.id = id;
    this.user.username = username;
  }

  unsetUserObject() {
    this.user.id = '';
    this.user.username = '';
  }

  deleteToken() {
    this.jwtToken = null;
    this.decodedToken = {};
    this.unsetUserObject();
  }

  decodeToken() {
    if (this.jwtToken) {
    this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodedToken() {
    return jwt_decode(this.jwtToken!);
  }

  getUser(): User {
    return this.user;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime = parseInt(this.getExpiryTime()!);
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
