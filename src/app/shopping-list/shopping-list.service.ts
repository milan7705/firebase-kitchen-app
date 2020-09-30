import { Injectable, EventEmitter } from '@angular/core'; 
import { Ingredient } from 'src/shared/ingredient.model';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  starterEditing = new Subject<number>();
  ingredientChanged = new Subject<Ingredient[]>();


 private Ingredients: Ingredient[] = [];

  constructor() { }

  getIngredients() {
  return this.Ingredients.slice();
  }
  getIngredient(index: number) {
    return this.Ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.Ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.Ingredients.slice());
  }

  addIngredient(Ingredient: Ingredient) {
    this.Ingredients.push(Ingredient);
    this.ingredientChanged.next(this.Ingredients.slice());
  }

  addIng(ingredients: Ingredient[]) {
    this.Ingredients.push(...ingredients);
    this.ingredientChanged.next(this.Ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.Ingredients.splice(index, 1);
    this.ingredientChanged.next(this.Ingredients.slice())
  }
}
