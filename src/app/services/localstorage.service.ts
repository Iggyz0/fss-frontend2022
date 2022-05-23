import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorageItem(key: string) {
      return localStorage.getItem(key);
  }

  removeLocalStorageItem(key: string) {
      localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  clearLocalStorageOnLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
}
