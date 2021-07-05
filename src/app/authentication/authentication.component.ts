import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Authg, AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
isLogin=false;
isLoading=false;
error:string=null;
  constructor(private auth:AuthService , private router:Router) { }

  ngOnInit():void{
  }
sign(){
  console.log(this.isLogin);
  this.isLogin=!this.isLogin;
  console.log(this.isLogin)
}
OnSubmit(form:NgForm){
const email=form.value.email;
const Password=form.value.Password;
this.isLoading=true;
let obser:Observable<Authg>;
if(this.isLogin){
obser=this.auth.login(email,Password);
}else{
obser=this.auth.signup(email,Password);
}
obser.subscribe(data=>{
    console.log(data)
    this.isLoading=false;
    this.router.navigate(['/recipes']);
  }
,error=>{
  console.log(error)
  this.isLoading=false;
this.error=error;
}
);

form.reset();
}
}

