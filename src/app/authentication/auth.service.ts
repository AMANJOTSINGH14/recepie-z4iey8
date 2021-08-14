import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
export interface Authg {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthService {
 private expireToken:any;
 clicked=new Subject<boolean>();
 user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    return this.http
      .post<Authg>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSZxbxrsp1VBb2RfsZ3dtjbZN8518ylsI',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handler),
        tap(res => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<Authg>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSZxbxrsp1VBb2RfsZ3dtjbZN8518ylsI',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
       .pipe(
        catchError(this.handler),
        tap(res => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }
logOut(){
  this.user.next(null);
localStorage.removeItem('userData');
if(this.expireToken){
  clearTimeout(this.expireToken)
}
this.expireToken=null;
}
autoLogOut(expiration:number){
  setTimeout(()=>{
    this.logOut()
  },expiration)
}
autoLogin(){
const datas:{
 email:string,
id:string,
 _token:string,
_tokenExpirationDate:string
}= JSON.parse(localStorage.getItem('userData'))
if(!datas){
  return;
}
const loadedData= new User(datas.email,datas.id,datas._token,new Date(datas._tokenExpirationDate))
if(loadedData.token){
  this.user.next(loadedData)
const expirationDuration=new Date(datas._tokenExpirationDate).getTime()-new Date().getTime(); 
this.autoLogOut(expirationDuration);
}
}
  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const Expiredtoken = new Date(new Date().getTime() + +expiresIn * 1000);
    const use = new User(email, localId, idToken, Expiredtoken);
    this.user.next(use);
   this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(use))
  }

  private handler(err: HttpErrorResponse) {
    let error = 'this is unusual error';
    if (!err.error || !err.error.error) {
      return throwError(error);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        error = 'This password is incorrect';
        break;
    }
    return throwError(error);
  }
}
