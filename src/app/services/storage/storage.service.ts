import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

// Session Storage

  getSessionStorage(key: string) : string | null {
    return sessionStorage.getItem(key) || null
  }

  removeSessionStorage(key: string)  : void {
    sessionStorage.removeItem(key)
  }

  setSessionStorage(key: string, value: string) : void {
    sessionStorage.setItem(key, value)
  }

// Local Storage


  getLocalStorage(key: string) : string | null {
    return localStorage.getItem(key) || null
  }

  removeLocalStorage(key: string)  : void {
    localStorage.removeItem(key)
  }

  setLocalStorage(key: string, value: string) : void {
    localStorage.setItem(key, value)
  }


}
