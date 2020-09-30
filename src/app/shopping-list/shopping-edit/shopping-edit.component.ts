import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm;
subscription: Subscription;
editMode = false;
editedItemIndex: number; 
editedItem : Ingredient;

  constructor(private moduleIngredientModule: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.moduleIngredientModule.starterEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.moduleIngredientModule.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
        });
  }

  onAddItem(form: NgForm) {
      const value = form.value;
      const newIngredient = new Ingredient(value.name,value.amount);
      if(this.editMode) {
        this.moduleIngredientModule.updateIngredient(this.editedItemIndex, newIngredient); 
      } else {
        this.moduleIngredientModule.addIngredient(newIngredient)
      }
      this.editMode = false;
      form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.moduleIngredientModule.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
