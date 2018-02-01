import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
//import { Item } from '../log-item-form/log-item-form.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Item {
  body: string;
}

export class User {
  body: string;
  userId: string 
}

export class Log { body: string; }


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
  bSubject = new BehaviorSubject("a"); 

  userId
  items

  userItemsList
  logItemList

  
  
  constructor(private http: Http, 
    private db: AngularFireDatabase,
    private userAuth: AngularFireAuth,
    authService: AuthService) {
    this.allLogsRef = db.object('Logs/');
    this.allLogItems = this.allLogsRef.valueChanges();
    this.allUsersRef = db.object('Users/');
    this.allUserItems = this.allUsersRef.valueChanges();

    userAuth.authState.subscribe((auth) => {
      this.userId = auth.uid
    });

    db.list<Log>('Logs').valueChanges().subscribe(console.log);
  

    console.log('HERE!!')
    console.log(userAuth)
    console.log(userAuth.auth)
    console.log('auth user id!!!!')
    console.log(authService.currentUserId)
    
    this.currentUserRef = db.object('Users/'+this.userId+'');
    this.currentUserItem = this.currentUserRef.valueChanges();
    this.currentUserLogsRef = db.object('Logs/'+this.userId+'');
    this.currentUserLogsItems = this.currentUserLogsRef.valueChanges();


  //  this.items = db.list(`1/Logs/${this.userId}`)

   // console.log('MY TEST ITEMS')
   // console.log(this.items)


    this.allLogItems.subscribe((items) => {
       console.log('ALL Log items')
      console.log(items)
     // this.logItems = items.json();
     //this.logArray = Array.of(this.logItems); 
   });

    this.allUserItems.subscribe((items) => {
      console.log('ALL USER Log items')
    console.log(items)
    // this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
    });
    
    this.currentUserItem.subscribe((items) => {
      console.log('ALL currentUserItem items')
      console.log(items)
      // this.logItems = items.json();
      //this.logArray = Array.of(this.logItems); 
  });

   this.currentUserLogsItems.subscribe((items) => {
      console.log('ALL currentUserLogsItems Log items')
      console.log(items)
      // this.logItems = items.json();
      //this.logArray = Array.of(this.logItems); 
   });
  }


  getLogItemsList(): Observable<any[]>{
    this.items = this.db.list(`Logs/${this.userId}`)
    console.log('MY TEST ITEMS')
    console.log(this.items)
    return this.logItemList;
  }

  getUserItemsList(): Observable<any[]>{
    this.items = this.db.list(`Users/${this.userId}`)
    console.log('MY TEST ITEMS')
    console.log(this.items)
    return this.userItemsList;
  }

  onInit() {
    console.log('initialised datastore') 
    this.getLogItemsList()
  }

  getAllLogItems(): Observable<any> {
       console.log('RETURNING ALL LOG ITEMS')
       return this.allLogItems
  }

  getCurrentUserLogItems(): Observable<any> {
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

  addUser(user){
    console.log('CREATING USER')
    console.log(user)
    
  //old way
    const afList = this.db.list(`Users/${this.userId}`);
    afList.push({ user });
    user.userId = this.userId
    //new way
    //const afList = this.db.list(`Users/`);
    //afList.push({ user });
   // this.currentUserItem.push(user)
    //this.allUsersRef.set({ name: user });
    //this.userItemsList.push(user)
    //this.allUsersRef.push( user).then((item) => { console.log('success - item key is: ' + item.key); console.log(item) });
   //this.allUsersRef.set({ name: item });
  }

  updateUser(newSize: string) {
    console.log('UPDATING LOG ITEM')
    this.allUsersRef.update({ size: newSize });
  //  this.db.object(`items/${userId}/${itemId}`).update(data)
  }

  deleteUser(logItem) {
   console.log('DELETING LOG ITEM')
   console.log(logItem)
   this.allUsersRef.remove();
  }

  addLogItem(logItem) {
    console.log('ADDING LOG ITEM')
    console.log(logItem)
   // this.logItemList.push(logItem)

    ///old way
    const afList = this.db.list(`Logs/${this.userId}`);
    afList.push({ logItem });

    



    //const listObservable = afList.snapshotChanges();
   // listObservable.subscribe();
    //this.allLogsRef.set({ name: logItem });
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
