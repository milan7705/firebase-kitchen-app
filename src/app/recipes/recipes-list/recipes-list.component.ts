import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipeAdded() {
    this.router.navigate(['new'], {relativeTo: this.route}); 
  }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
