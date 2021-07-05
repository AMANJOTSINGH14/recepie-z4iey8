import { Component, OnInit} from '@angular/core';
import{Recepie} from './recepie.model';
import { recepieservice } from './recepie.service';
@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {
selectedRecepie : Recepie;
  constructor(private recepieService:recepieservice) { }

  ngOnInit() {
 this.recepieService.recepieselected.subscribe(
   (recepie:Recepie) => {
     this.selectedRecepie=recepie;
   }
 )
  }

}