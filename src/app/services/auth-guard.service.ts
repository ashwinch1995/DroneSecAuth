import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  gettoken(){  
    return !!localStorage.getItem("SessionUserName");  
  }  

  getSessionUsername() {
    return localStorage.getItem("SessionUserName");
  }

  emptySessionUsername() {
    localStorage.clear();
  }
}
