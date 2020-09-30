import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Ingredients: Ingredient[];
  private idChangeSub: Subscription;
  constructor(private moduleIngredientService: ShoppingListService) { }

  ngOnInit(): void {
    this.Ingredients = this.moduleIngredientService.getIngredients();
    this.idChangeSub = this.moduleIngredientService.ingredientChanged.subscribe((Ingredients: Ingredient[]) => {
      this.Ingredients = Ingredients;
    })
  }
    onEditItem(index: number) {
     this.moduleIngredientService.starterEditing.next(index);
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }
}
