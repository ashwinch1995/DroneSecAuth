import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { user } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userCollection:AngularFirestoreCollection<user>;

  constructor(private afs: AngularFirestore, private _http: HttpClient) { 
    this.userCollection = this.afs.collection<user>('/users');
  }

  getUsers() {
    return this.userCollection.get();
  }
  headerOptions: any = null

  _isLoggedIn: boolean = false

  authSub = new Subject<any>();

  loginAuth(userObj: any): any {
    if (userObj.authcode != '') {
      console.log('Appending headers');
      this.headerOptions = new HttpHeaders({
        'x-tfa': userObj.authcode
      });
    }
    return this._http.post(environment.apiURL + "/login", { uname: userObj.userName, upass: userObj.password }, { observe: 'response', headers: this.headerOptions });
  }

  setupAuth() {
    return this._http.post(environment.apiURL + "/tfa/setup", {}, { observe: 'response' })
  }

  registerUser(userObj: any) {
    return this._http.post(environment.apiURL + "/register", { uname: userObj.uname, upass: userObj.upass }, { observe: "response" });
  }

  updateAuthStatus(value: boolean) {
    this._isLoggedIn = value
    this.authSub.next(this._isLoggedIn);
    localStorage.setItem('isLoggedIn', value ? "true" : "false");
  }

  getAuthStatus() {
    this._isLoggedIn = localStorage.getItem('isLoggedIn') == "true" ? true : false;
    return this._isLoggedIn
  }

  logoutUser() {
    this._isLoggedIn = false;
    this.authSub.next(this._isLoggedIn);
    localStorage.setItem('isLoggedIn', "false")
  }

  getAuth() {
    return this._http.get(environment.apiURL + "/tfa/setup", { observe: 'response' });
  }

  deleteAuth() {
    return this._http.delete(environment.apiURL + "/tfa/setup", { observe: 'response' });
  }

  verifyAuth(token: any) {
    return this._http.post(environment.apiURL + "/tfa/verify", { token }, { observe: 'response' });
  }
}
