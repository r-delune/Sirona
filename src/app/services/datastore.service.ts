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
export class Item {body: string;}
export class User {body: string;userId: string }
export class Log { body: string; }

@Injectable()
export class DatastoreService {
  //CHANGE: REMOVE UNUSED VARIABLES
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
          this.exerciseItemList = data;
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
  }

  //CHANGE:REMOVE USELESS FUNCTIONS 

  getLogItemsList(): Observable<any[]>{
    return this.logItemList;
  }

  getUserMoodItemsList(): Observable<any[]>{
   console.log('getUserMoodItemsList')
    return this.moodItemList
  }

  getUserSleepItemsList(): Observable<any[]>{
    console.log('getUserSleepItemsList')
    return this.sleepItemList
    //CHANGE: ADD NO DATA USE CASE
  }

  getUserDietItemsList(): Observable<any[]>{
    console.log('dietItemList')
    console.log(this.dietItemList)   
    return this.dietItemList
  }

  getUserExerciseItemsList(): Observable<any[]>{
    console.log('getUserExerciseItemsList')
    console.log(this.exerciseItemList)
    return this.exerciseItemList
  }

  getUserItemsList(): Observable<any[]>{
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

  getUserMoodLogItems(): Observable<any> {
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

  //CHANGE:UPDATE USER INFO
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

//GET USER IMAGES