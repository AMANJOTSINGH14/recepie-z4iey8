import { Component,Input} from '@angular/core';
import { Router } from '@angular/router';
import{Recepie} from '../../recepie.model';
import { recepieservice } from '../../recepie.service';
@Component({
  selector: 'app-recepie-item',
  templateUrl: './recepie-item.component.html',
  
})
export class RecepieItemComponent {
ids:string
  @Input() recepie: Recepie;
@Input() index: number;
  constructor(private recpieService:recepieservice, private router:Router) { }

 doubleTap(id){
  if(this.ids===id){
    this.router.navigate(['/recipes']);
    this.ids=null;
  }else{
    this.router.navigate(['/recipes',id]);
    this.ids=id;}  
 }
}