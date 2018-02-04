import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { DietItem } from '../log-item-form/log-item-form.component';

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
  currentUserMoodItems
  currentUserMoodLogsRef
  currentUserSleepItems
  currentUserSleepLogsRef
  currentUserDietItems
  currentUserDietLogsRef
  currentUserExerciseItems
  currentUserExerciseLogsRef
  currentUserLogsRef
  bSubject = new BehaviorSubject("a"); 
  moodItems
  sleepItems
  dietItems
  exerciseItems
  userId
  items
  dietItemsSuscription
  sleepItemsSuscription
  exerciseItemsSuscription
  moodItemsSuscription
  userItemsList
  logItemList
  dietItemsTestRef
  dietItemsTest 
  dietItemsTestListRef
  dietItemsTestList
  dietItemsTestSuscription
  dietItemList
  sleepItemList
  moodItemList
  exerciseItemList

  constructor(private http: Http, 
    private db: AngularFireDatabase,
    private userAuth: AngularFireAuth,
    private authService: AuthService) {
    this.allLogsRef = db.object('Logs/');
    this.allLogItems = this.allLogsRef.valueChanges();
    this.allUsersRef = db.object('Users/');
    this.allUserItems = this.allUsersRef.valueChanges();

    userAuth.authState.subscribe((auth) => {
      this.userId = auth.uid
        
      let subscribe1 = db.object(`Logs/Diet/${this.userId}`).valueChanges().subscribe(
        data =>{
          this.dietItemList = data;
        }
      );

      let subscribe2 = db.object(`Logs/Exercise/${this.userId}`).valueChanges().subscribe(
        data =>{
          console.log('subscribing to exercise items')
          this.exerciseItemList = data;
          console.log(data)
        }
      );

      let subscribe3 = db.object(`Logs/Mood/${this.userId}`).valueChanges().subscribe(
        data =>{
          this.moodItemList = data;
        }
      );

      let subscribe4 = db.object(`Logs/Sleep/${this.userId}`).valueChanges().subscribe(
        data =>{
          this.sleepItemList = data;
        }
      );
    });
    
    this.currentUserRef = db.object('Users/'+this.userId+'');
    this.currentUserItem = this.currentUserRef.valueChanges();
    this.currentUserLogsRef = db.object('Logs/'+this.userId+'');
    this.currentUserLogsItems = this.currentUserLogsRef.valueChanges();
    this.currentUserMoodLogsRef = db.object('Logs/Mood'+this.userId+'');
    this.currentUserMoodItems = this.currentUserMoodLogsRef.valueChanges();
    this.currentUserSleepLogsRef = db.object('Logs/Sleep/'+this.userId+'');
    this.currentUserSleepItems = this.currentUserSleepLogsRef.valueChanges();
    this.currentUserExerciseLogsRef = db.object('Logs/Exercise/'+this.userId+'');
    this.currentUserExerciseItems = this.currentUserExerciseLogsRef.valueChanges();
    this.currentUserDietLogsRef = db.object('Logs/Diet');
    this.currentUserDietItems = this.currentUserDietLogsRef.valueChanges();

    // Get an object, just the data (valuesChanges function), and all subsequent changes
    //this.dietItemsTestRef = db.object(`Logs/Diet/${this.userId}`);
    //console.log(`Logs/Diet/${this.userId}`)
    //this.dietItemsTest = this.dietItemsTestRef.valueChanges();
    //this.dietItems = this.db.list(`Logs/Diet`)
    //this.allLogItems.subscribe((items) => {
    //console.log('ALL Log items')
    //console.log(items)
    //this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
    //});

    //this.allUserItems.subscribe((items) => {
    //console.log('ALL USER Log items')
    //console.log(items)
    //this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
    //});
    
    //this.currentUserItem.subscribe((items) => {
    //console.log('ALL currentUserItem items')
    //console.log(items)
    //this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
    //});

  this.currentUserDietItems.subscribe((items) => {
    //console.log('ALL currentUserDietItems items')\
   // console.log('DIETITEMSUBSCRIPTIONS')
    //console.log(items)
    this.dietItemsSuscription = items
   // console.log(this.dietItemsSuscription)
    //console.log('INSIDE SUBSCRIBE getUserDietItemsList')
  //  console.log(this.sleepItemsSuscription[''+this.userId+''])
   // console.log(this.sleepItemsSuscription[ `Logs/Diet/${this.userId}`])
   // console.log(this.dietItemsSuscription.userId)   
   
    //this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
  });



   //this.dietItemsTest.subscribe((items) => {
   //console.log('ALL currentUserDietItems items')
   //console.log('DIETITEMTEST')
   //console.log(items)
   //this.dietItemsTestSuscription = items
   //console.log(this.dietItemsTestSuscription)
   //this.logItems = items.json();
   //this.logArray = Array.of(this.logItems); 
   ///});

  this.currentUserMoodItems.subscribe((items) => {

    this.dietItemsSuscription = items
    //console.log('ALL currentUserMoodItems items')
    //console.log(items)
    //this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
  });

  this.currentUserSleepItems.subscribe((items) => {
    this.sleepItemsSuscription = items
    //console.log('ALL currentUserSleepItems items')
    //console.log(items)
    //this.logItems = items.json();
    //this.logArray = Array.of(this.logItems); 
  });

  this.currentUserExerciseItems.subscribe((items) => {
    console.log('subscribing to exercise items 2')
    this.exerciseItemsSuscription = items
    console.log(items)

  });
  }


  getLogItemsList(): Observable<any[]>{
    this.items = this.db.list(`Logs/${this.userId}`)
   // console.log('MY TEST ITEMS')
   // console.log(this.items)
    return this.logItemList;
  }

  getUserMoodItemsList(): Observable<any[]>{
   // this.moodItems = this.db.list(`Logs/Mood/${this.userId}`)
   // console.log('getUserMoodItemsList')
   // console.log(this.items)
   console.log('getUserMoodItemsList')
  // console.log(this.sleepItemsSuscription[this.userId])
    return this.moodItemList
  }

  getUserSleepItemsList(): Observable<any[]>{
   // this.sleepItems = this.db.list(`Logs/Sleep/${this.userId}`)
   // console.log('getUserMoodItemsList')
    console.log('getUserSleepItemsList')
   // console.log(this.sleepItemsSuscription[this.userId])
   
    return this.sleepItemList
  }

  getUserDietItemsList(): Observable<any[]>{
    //this.dietItems = this.db.list(`Logs/Diet/${this.userId}`)
    //console.log('getUserMoodItemsList1')
    //console.log(this.dietItems)
    //console.log('getUserMoodItemsList2')
    //console.log(this.currentUserDietItems)
    //console.log('dietItemsSuscription')
    //console.log(this.dietItemsSuscription)
    //console.log('!dietItemsTest!')
    //console.log(this.dietItemsTest)
    //console.log('!dietItemsTestList!')
    //console.log(this.dietItemsTestList)
    //console.log('dietItemsTestSuscription')
    //console.log(this.dietItemsTestSuscription)
   // this.dietItemsTestListRef = this.db.list(`Logs/Diet/${this.userId}`)
   //this.dietItemsTestList = this.dietItemsTestRef.valueChanges();
    console.log('TEST 2! - dietItemsTestList')
    console.log(this.dietItemsTestList)
    console.log(this.dietItemsTestListRef)
    //console.log(this.userId)
    //
    //console.log(this.dietItemsTestRef)
    //WILL NEED TO QUERY FIREBASE INSTEAD OF CURRENT METHOD
    console.log('!!!!!!!!!dietItemsSuscription')
    console.log(this.dietItemsSuscription)
   // console.log(this.dietItemsSuscription[this.userId])
    console.log('dietItemList')
    console.log(this.dietItemList)   
    return this.dietItemList
  }

  getUserExerciseItemsList(): Observable<any[]>{
//this.exerciseItems = this.db.list(`Logs/Exercise/${this.userId}`)
    console.log('getUserMoodItemsList')
    console.log(this.items)
    console.log('getUserExerciseItemsList')
    //console.log(this.sleepItemsSuscription[this.userId])
    console.log('this.exerciseItemList')
    console.log(this.exerciseItemList)

    return this.exerciseItemList
  }

  getUserItemsList(): Observable<any[]>{
   // this.items = this.db.list(`Users/${this.userId}`)
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

  getAllCurrentUserLogItems(): Observable<any> {
    console.log('RETURNING All USER LOG ITEMS') 
    return this.currentUserLogsItems
  }

  getUserMoodItems(): Observable<any> {
    console.log('getUserMoodItems') 
    return this.currentUserMoodItems
  }

  getUserSleepLogItems(): Observable<any> {
    console.log('getUserSleepLogItems') 
    return this.currentUserSleepItems
  }
  getUserDietLogItems(): Observable<any> {
    console.log('getUserDietLogItems') 
    return this.currentUserDietItems
  }
  getUserExerciseLogItems(): Observable<any> {
    console.log('getUserExerciseLogItems') 
    return this.currentUserExerciseItems
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

  addMoodEntry(moodEntry) {
    console.log('ADDING moodEntry ITEM')
    console.log(moodEntry)
    const afList = this.db.list(`Logs/Mood/${this.userId}`);
    afList.push({ moodEntry });
  }

  addSleepEntry(sleepEntry) {
    console.log('ADDING sleepEntry ITEM')
    console.log(sleepEntry)
    const afList = this.db.list(`Logs/Sleep/${this.userId}`);
    afList.push({ sleepEntry });
  }

  addDietEntry(dietEntry) {
    console.log('ADDING dietEntry ITEM')
    console.log(dietEntry)
    const afList = this.db.list(`Logs/Diet/${this.userId}`);
    afList.push({ dietEntry });
  }

  addExerciseEntry(exerciseEntry) {
    console.log('ADDING exerciseEntry ITEM')
    console.log(exerciseEntry)
    const afList = this.db.list(`Logs/Exercise/${this.userId}`);
    afList.push({ exerciseEntry });
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
