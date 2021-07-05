import { HttpHandler, HttpInterceptor, HttpRequest ,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
constructor(private auth:AuthService) { }
intercept(req:HttpRequest<any> ,next:HttpHandler){
 return this.auth.user.pipe(
      take(1),
      exhaustMap(emap=> {
if (!emap){
  console.log( "this is simpel",req)
  return next.handle(req)
}
const mod = req.clone( {
   
            params:new HttpParams().set('auth', emap.token)
          })
  console.log( "this is second",req)
return next.handle(mod);

      }));
}
  

}