import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { DatastoreService } from '../services/datastore.service';
import { lookupListToken } from '../providers';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mw-log-item-table',
  templateUrl: './log-item-table.component.html',
  styleUrls: ['./log-item-table.component.css']
})

export class LogItemTableComponent {
  list;
  medium = '';
  logItems: Observable<any>;
  logArray;
  user

  constructor(
    private formBuilder: FormBuilder,
    //allow access to media item service so we can add 
    private datastoreService: DatastoreService,  
    private activatedRoute: ActivatedRoute,
     authService: AuthService,
    db: AngularFireDatabase) {
     // this.itemRef = db.object('Users');
     // this.logItems = this.itemRef.valueChanges();
    }

    //tells angular that we want the lookuplist value item
    //we want to use this in the template markup so we can render out the select options in the form
    // we are using the opaque token we created, this is value type injection

    //this.paramsSubscription = this.activatedRoute.params
    //  .subscribe(params => {
     //   let medium = params['medium'];
     //   if(medium.toLowerCase() === 'all') {
     //     medium = '';
     //   }
     //   this.getLogItems(medium);
      //});
   // }

  ngOnInit() {
  //  this.logItems.subscribe((items) => {
  //    console.log('Log items')
  // //   console.log(items)
     // this.logItems = items.json();
     // this.logArray = Array.of(this.logItems); 
   // });
  }

  ngOnDestroy() {
  //  this.paramsSubscription.unsubscribe();
  }

  onLogItemDelete(logItem) {
    this.datastoreService.deleteLogItem(logItem)
     // .subscribe(() => {
     //   this.getLogItems(this.medium);
     // });
  }

  getLogItems(medium) {
    this.medium = medium;
    console.log('Log: ')
    console.log(this.logItems)
  }

  percentageValidator(control){
    if (control.value.trim().length === 0){
      return null
    }

    let inputValue = parseInt(control.value)
    let minValue = 1;
    let maxValue = 100;

    if (inputValue >= minValue && inputValue <= maxValue){
      return null
    }else{
      return { 
        'inputValue': {
        min: minValue,
        max: maxValue
      }
    }
  }
  }
}
