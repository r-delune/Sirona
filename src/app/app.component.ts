import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { Router, RouterModule } from '@angular/router';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabase, AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AngularFireAction } from '@angular/cli'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { Item } from './log-item-form.component';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { LogItemService } from './log-item.service';

@Component({
  selector: 'mw-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

    itemRef: AngularFireObject<any>;
    item: Observable<any>;
    logItems;
    
    constructor(db: AngularFireDatabase,
    private logItemService: LogItemService) {
      this.itemRef = db.object('Users');
      //this.item = this.itemRef.valueChanges();
      this.logItems = this.logItemService.getLogItems()
      console.log('App logItems')
      console.log(this.logItems) 
    }
   
    save(newName: string) {
      this.itemRef.set({ name: newName });
    }

    update(newSize: string) {
      this.itemRef.update({ size: newSize });
    }

    delete() {
      this.itemRef.remove();
    }

    ngOnInit() {
      //this.item.subscribe((items) => {
      //  console.log('Appcomponent not using servcioe')
      //   console.log(items)
      // });
        this.logItems = this.logItemService.getLogItems()
        console.log('Appcomponent  servcioe')
        console.log(this.logItems)
    }
}
 
