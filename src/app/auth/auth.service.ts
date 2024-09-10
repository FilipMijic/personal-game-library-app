import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated = false;

  get isUserAuthenticated() {
    return this._isUserAuthenticated;
  }

  register() {
    this._isUserAuthenticated = true;
  }

  login() {
    this._isUserAuthenticated = true;
  }

  logout() {
    this._isUserAuthenticated = false;
  }


  constructor() { }
}
