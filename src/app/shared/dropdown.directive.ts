import { Directive,HostListener,HostBinding } from '@angular/core';
@Directive({
  selector:'[appDropdown]'
})
export class dropdown{
@HostBinding('class.show') isOpen = false;
@HostListener('click') toggleOpen(){
  this.isOpen = !this.isOpen;
}
}