import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireDatabaseProvider, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Item } from '../log-item-form/log-item-form.component';
//get and set data from the data store
//in this case, display items
//can wrap up a formula here and use it wherever
//specific things that are none component specific

@Injectable()
export class LogItemService {

  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  users: Observable<Item>;

  logRef: AngularFireObject<any>;
  logItem: Observable<any>;
  logItems: Observable<Item>;
  
  constructor(private http: Http, db: AngularFireDatabase) {
    this.itemRef = db.object('Users');
    this.item = this.itemRef.valueChanges();

    this.logRef = db.object('Users/0/log');
    this.logItem = this.itemRef.valueChanges();


    console.log(this.itemRef)
    console.log(this.item)

    const users: AngularFireObject<Item> = db.object('Users')
    const logItems: AngularFireObject<Item> = db.object('Users/0/log')
  }

  getLogItems() {
    this.logItem.subscribe((logItems) => {
      console.log('getting LogItem service from base')
       console.log(logItems)
       console.log(logItems.length)
       return this.logItems
     });
  }

  getUserItems() {
    this.item.subscribe((items) => {
      console.log('getting User Item service from base')
       console.log(items)
       //return items
       return this.users
     }); 
  }

  addLogItem(logItem) {
    console.log('adding')

  }

 saveLogItem(newName: string) {
  console.log('saving logItem')
   this.itemRef.set({ name: newName });
 }

 saveUser(newName: string) {
  console.log('saving user')
   this.itemRef.set({ name: newName });
 }

 updateLogItem(newSize: string) {
  console.log('updating')
   this.itemRef.update({ size: newSize });
 }

 deleteLogItem(logItem) {
  console.log('deleting item ')
  console.log(logItem)
   this.itemRef.remove();
 }

 ngOnInit() {
   this.item.subscribe((items) => {
     console.log('User Item service')
      console.log(items)
    });

    this.logItem.subscribe((logItem) => {
      console.log('Log Item service')
       console.log(logItem)
     });
 }
}
