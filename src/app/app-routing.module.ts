import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesNewComponent } from './recipes/recipes-new/recipes-new.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service'
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './home-page/auth.guard'

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomePageComponent},

  {path: 'recipes', component: RecipesComponent,
  canActivate: [AuthGuard], 
  children: [
    {path: '', component:RecipesNewComponent},
    {path: 'new', component:RecipesEditComponent},
    {path: ':id', component:RecipesDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component:RecipesEditComponent, resolve: [RecipesResolverService]},
  ]},
   {path: 'shopping-list', component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
