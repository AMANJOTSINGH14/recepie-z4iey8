import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  constructor() {}
  @Output() close= new EventEmitter<void>()
  ngOnInit():void {}
  Onclose(){
this.close.emit()
  }
}
