import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireDatabaseProvider, AngularFireObject, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Item } from '../log-item-form/log-item-form.component';
import { AngularFireAuth } from 'angularfire2/auth';
//get and set data from the data store
//in this case, display items
//can wrap up a formula here and use it wherever
//specific things that are none component specific
export class ItemTest {
  body: string;
}

@Injectable()
export class LogItemService {

  itemTest : AngularFireObject<ItemTest[]> = null;
  userId: string;
  itemRef: AngularFireObject<any>;
  items: Observable<any>;
  users : AngularFireObject<any>;
  logRef: AngularFireObject<any>;
  logItem: Observable<any>;
  logItems: Observable<Item>;
  
  
  constructor(private http: Http, db: AngularFireDatabase,
    dbm: AngularFireDatabaseModule,
  private userAuth: AngularFireAuth) {
    this.itemRef = db.object('0/Logs');
    this.items = this.itemRef.valueChanges();
    this.logRef = db.object('0/Users/');
    this.logItem = this.itemRef.valueChanges();

    this.userAuth.authState.subscribe(user => {
     // if (user) this.userId = user.uid
    })

    this.userAuth.authState.subscribe(user => {
     // this.userId = user.uid
    })

    this.items.subscribe((myitems) => {
      console.log('User Item service')
       console.log(myitems)
     });

      this.logItem.subscribe((logItems) => {
        console.log('getting LogItem service from base inside constructor')
         console.log(logItems)
       });

    console.log(this.itemRef)
    console.log(this.items)

    console.log(this.logItem)
    console.log(this.items)

  //  const users: AngularFireObject<Item> = db.object('Users')
   // const logItems: AngularFireObject<Item> = db.object('Users/0/log')
  }


  getUsersList() : AngularFireObject<ItemTest[]>{
    console.log('user id is null, retturnign')

    if (!this.userId) return;
    //this.itemTest = this.db.list('items/${this.userId}')
    console.log('getting user list')
    console.log(this.users)
    return this.itemTest;
  }

  createUser(item: Item){

    console.log('creating user')
   // this.itemTest.push(item)
  }

  getLogItems() {
    this.logItem.subscribe((logItems) => {
      console.log('getting LogItem service from base outside constructor')
       console.log(logItems)
       return this.logItems
     });
  }

  getUserItems() {
    this.items.subscribe((items) => {
      console.log('getting Items from base')
       console.log(items)
       //return items
       return this.items
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

 }
}
