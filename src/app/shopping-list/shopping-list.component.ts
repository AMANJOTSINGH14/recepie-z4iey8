import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.modal';
import { shoppinglistservice } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingrediant[];
  private ischanged: Subscription;
  constructor(private shoppinglistsl: shoppinglistservice) {}

  ngOnInit(): void {
    this.ingrediants = this.shoppinglistsl.getingrediant();
  
    this.ischanged = this.shoppinglistsl.changed.subscribe(
      (ingrediants: Ingrediant[]) => {
        this.ingrediants = ingrediants;
            }
    );
  }
  onEditItem(index: number) {
    // console.log(index);
    this.shoppinglistsl.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.ischanged.unsubscribe();
  }
}
