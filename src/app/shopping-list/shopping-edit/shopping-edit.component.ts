import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../../shared/ingrediant.modal';
import { shoppinglistservice } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription;
  editedItem: Ingrediant;
  constructor(private slservice: shoppinglistservice) {}

  ngOnInit():void {
    this.subscription = this.slservice.startedEditing.subscribe(
      (index: number) => {
        console.log('hey bv' + this.editedItemIndex);
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slservice.getingrediantone(index);
        console.log(this.editedItem);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onAdditem(slform: NgForm) {
    //  const newIngredient = new Ingrediant(this.nameInputRef.nativeElement.value ,this.amountInputRef.nativeElement.value);
    const value = slform.value;
    const newIngredient = new Ingrediant(value.name, value.amount);
   
    if(this.editMode) {
      this.slservice.updateIngredient(this.editedItemIndex, newIngredient);
    } 
    else {
      this.slservice.addingrediant(newIngredient);
    }
    this.editMode = false;
    slform.reset();
  }
onClear(){
  this.slForm.reset();
this.editMode=false;  
}
onDelete(){
this.slservice.onDeleteIndgrediant(this.editedItemIndex)
this.onClear()

}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
