import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HeaderComponent } from './header/header.component';
import { RecepieComponent } from './recepie/recepie.component';
import { RecepieDetailComponent } from './recepie/recepie-detail/recepie-detail.component';
import { RecepieListComponent } from './recepie/recepie-list/recepie-list.component';
import { RecepieItemComponent } from './recepie/recepie-list/recepie-item/recepie-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { dropdown } from './shared/dropdown.directive';
import { shoppinglistservice } from './shopping-list/shoppinglist.service';

import { RecipestartedComponent } from './recepie/recipestarted/recipestarted.component';
import { approutingModule } from './app-routing.module';
import { RecipeEditComponent } from './recepie/recipe-edit/recipe-edit.component';
import { recepieservice } from './recepie/recepie.service';
import { StorageService } from './shared/storage.service';
import { RecipeResolverService } from './recepie/recipe-resolver.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthService } from './authentication/auth.service';
import { LoadingComponent } from './shared/loading/loading.component';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { DeactivateguardService } from './recepie/recipe-edit/deactivate-guard.service';




@NgModule({
  imports:      [ BrowserModule, FormsModule ,HttpClientModule ,approutingModule, ReactiveFormsModule],
  declarations: [ AppComponent, HelloComponent, HeaderComponent,  RecepieComponent, RecepieDetailComponent, RecepieListComponent, RecepieItemComponent , ShoppingListComponent, ShoppingEditComponent,dropdown, RecipestartedComponent, RecipeEditComponent, AuthenticationComponent, LoadingComponent ],
  bootstrap:    [ AppComponent ],
  providers:[shoppinglistservice,recepieservice, StorageService, RecipeResolverService,AuthService, DeactivateguardService,{provide:HTTP_INTERCEPTORS, useClass : AuthInterceptorService , multi:true}]
})
export class AppModule { }
