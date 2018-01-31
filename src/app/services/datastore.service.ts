import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Item } from '../log-item-form/log-item-form.component';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DatastoreService {

  allLogItems: Observable<Item>;
  allUserItems: Observable<Item>;
  currentUserLogsItems: Observable<Item>;
  userRef;
  logRef;
  allUsersRef;
  allLogsRef;
  currentUserRef
  currentUserItem
  currentUserLogsRef
  
  constructor(private http: Http, db: AngularFireDatabase,
    private userAuth: AngularFireAuth) {
    this.allLogsRef = db.object('0/Logs/');
    this.allLogItems = this.allLogsRef.valueChanges();
    this.allUsersRef = db.object('1/Users/');
    this.allUserItems = this.allUsersRef.valueChanges();

      console.log('HERE!!')
      console.log(userAuth)
      console.log(userAuth.auth)
     // console.log(userAuth.auth.currentUser.uid)

     // this.currentUserRef = db.object('1/Users/'+userAuth.auth.currentUser.uid+'');
     // this.currentUserItem = this.currentUserRef.valueChanges();
     // this.currentUserLogsRef = db.object('1/Logs/'+userAuth.auth.currentUser.uid+'');
     // this.currentUserLogsItems = this.currentUserLogsRef.valueChanges();
  }

  getAllLogItems(): Observable<any> {
       console.log('RETURNING ALL LOG ITEMS')
       return this.allLogItems
  }

  getUserLogItems(): Observable<any> {
    console.log('RETURNING USER LOG ITEMS')
    return this.currentUserLogsItems
  }

  getAllUserInfo(): Observable<any> {
    console.log('RETURNING ALL USER INFO')
    console.log(this.allUserItems)
   return this.allUserItems
  }

  getCurrentUserInfo(): Observable<any> {
       console.log('RETURNING CURRENT USE INFO')
       console.log(this.currentUserItem)
      return this.currentUserItem
  }

  addUser(item: Item){
    console.log('CREATING USER')
   // this.itemTest.push(item)
   this.allUsersRef.set({ name: item });
  }

  updateUser(newSize: string) {
    console.log('UPDATING LOG ITEM')
    this.allUsersRef.update({ size: newSize });
  }

  deleteUser(logItem) {
   console.log('DELETING LOG ITEM')
   console.log(logItem)
   this.allUsersRef.remove();
  }

  addLogItem(logItem) {
    console.log('ADDING LOG ITEM')
    this.allLogsRef.set({ name: logItem });
  }

  updateLogItem(newSize: string) {
    console.log('UPDATING LOG ITEM')
    this.allLogsRef.update({ size: newSize });
  }

  deleteLogItem(logItem) {
   console.log('DELETING LOG ITEM')
   console.log(logItem)
   this.allLogsRef.remove();
 }
}
