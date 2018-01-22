import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogItemService } from './log-item.service';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireDatabaseProvider, AngularFireObject } from 'angularfire2/database';
import { User } from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AngularFirestore } from 'angularfire2/firestore';

export interface Item {
  User: string;
  log: string;
}

@Component({
  selector: 'mw-log-item-list',
  templateUrl: './log-item-list.component.html',
  styleUrls: ['./log-item-list.component.css']
})
export class LogItemListComponent {
  medium = '';
  logItems
  paramsSubscription;
  firstUserDetails = []
  firstUserLogItem = []
  arr = []
  itemRef: AngularFireObject<any>;
  logRef :  AngularFireObject<any>;
  logList
  currentList
  items
  array = []
  grey = []
  albums
  mystring


  constructor(
    //allow access to media item service so we can add 
    private logItemService: LogItemService,  
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    db: AngularFireDatabase) {
     
      this.albums = db.list('Users/1/log');

      this.itemRef = db.object('Users/1/log');
      this.logItems = this.itemRef.valueChanges();

      this.logRef = db.object('Users/1/log');
      this.logList = this.logRef.valueChanges();

      const logCollection = afs.collection<Item>('Users/0/log');
    }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
    this.logList.subscribe((items) => {
    this.mystring = items;
    this.logRef = items;
    this.logItems = items;
    console.log( 'this.logItems') 
    console.log( this.logItems) 
    console.log(this.logRef) 
  });
  }

  ngOnDestroy() {
   // this.paramsSubscription.unsubscribe();
  }

  onLogItemDelete(logItem) {
    this.logItemService.deleteLogItem(logItem)
  }

  getLogItems() {

  }
}
