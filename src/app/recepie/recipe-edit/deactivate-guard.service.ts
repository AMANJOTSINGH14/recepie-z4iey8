import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface cancomponentDeactivate{
canDeactivate:() => Observable<boolean> | Promise<boolean> | boolean;
}
export class DeactivateguardService implements CanDeactivate<cancomponentDeactivate>{
  canDeactivate(component: cancomponentDeactivate,
  currentRoute:ActivatedRouteSnapshot , 
  currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean {
    return component.canDeactivate();
  }
  
}