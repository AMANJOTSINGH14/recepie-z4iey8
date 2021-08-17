import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared/storage.service';
import{Recepie} from './recepie.model';
import { recepieservice } from './recepie.service';
@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit,OnDestroy {
selectedRecepie : Recepie;
unsub:Subscription
constructor(private recepieService:recepieservice,private se:StorageService) { }

  ngOnInit() {
    this.unsub=this.se.onData()
    this.se.onFetchingData().subscribe();


    //  this.recepieService.recepieselected.subscribe(
//    (recepie:Recepie) => {
//      this.selectedRecepie=recepie;
//    }
//  )
  }
ngOnDestroy(){
  console.log('destroy recipe')
  this.unsub.unsubscribe()
}
}