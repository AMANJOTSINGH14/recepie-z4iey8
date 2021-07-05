import { Component,Input} from '@angular/core';
import{Recepie} from '../../recepie.model';
import { recepieservice } from '../../recepie.service';
@Component({
  selector: 'app-recepie-item',
  templateUrl: './recepie-item.component.html',
  
})
export class RecepieItemComponent {
@Input() recepie: Recepie;
@Input() index: number;
  constructor(private recpieService:recepieservice) { }

 
}