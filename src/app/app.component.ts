import { Component, OnInit, VERSION } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{

constructor(private aut:AuthService){}

ngOnInit(){
  this.aut.autoLogin();
}
}
