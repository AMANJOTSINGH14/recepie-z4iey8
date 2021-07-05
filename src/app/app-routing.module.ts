import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipestartedComponent } from './recepie/recipestarted/recipestarted.component';
import { RecepieComponent } from './recepie/recepie.component';
import { RecepieDetailComponent } from './recepie/recepie-detail/recepie-detail.component';

import { RecipeEditComponent } from './recepie/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recepie/recipe-resolver.service';
import { AuthenticationComponent } from './authentication/authentication.component';
const approute: Routes = [
 {
    path: 'recipes',
    component: RecepieComponent,
    children: [
      { path: '', component: RecipestartedComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecepieDetailComponent, resolve:[RecipeResolverService]},
      { path: ':id/edit', component: RecipeEditComponent , resolve:[RecipeResolverService] }
    ]
  },
  { path: 'shopping', component: ShoppingListComponent },
  {path:'auth' , component:AuthenticationComponent}
  //  { path: '**', redirectTo: '/recipes', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(approute)],
  exports: [RouterModule]
})
export class approutingModule {}
