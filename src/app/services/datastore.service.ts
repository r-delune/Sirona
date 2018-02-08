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
  userData
  userList
  allUsersList
  //CHANGE: OBJETCS TO LISTS
  userDataObject
  constructor(private http: Http, 
    private db: AngularFireDatabase,
    private userAuth: AngularFireAuth,
    private authService: AuthService) {
    this.allLogsRef = db.object('Logs/');
    this.allLogItems = this.allLogsRef.valueChanges();
    this.allUsersRef = db.object('Users/');
    this.allUserItems = this.allUsersRef.valueChanges();

    userAuth.authState.subscribe((auth) => {

      console.log('Datastore, subscribe/userAuth/authservie - ')
      console.log(auth)
      console.log(userAuth)
      console.log(authService)

      try { this.userId = auth.uid;console.log(`Users/${this.userId}`)} catch{console.log('Datastore resubscribing but no uid found')} 
      

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

      let subscribe5 = db.object(`Users/${this.userId}`).valueChanges().subscribe(
        data =>{
          
          console.log('USER List')
          console.log(data)
          this.userData = data;
        }
      );

      let subscribe6 = db.object(`Users`).valueChanges().subscribe(
        data =>{
          console.log(`Users/${this.userId}`)
          console.log('ALL USER Data observer')
          try { console.log(this.authService)} catch{console.log('ALL USR data resubscribing but no uid found')} 
          console.log(data)
          this.allUsersList = data;
        }

      );

      let subscribe7 = db.list(`Users/${this.userId}`).valueChanges().subscribe(
        data =>{  
          console.log('USER INFO observer')
          console.log(data[0])
          try { console.log(this.authService)} catch{console.log('USR info resubscribing but no uid found')} 
          this.userDataObject = data[0]
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
    //console.log('initialised datastore') 
   // this.getLogItemsList()
  }

  getAllLogItems(): Observable<any> {
       console.log('RETURNING ALL LOG ITEMS')
       return this.allLogItems
  }

  getAllCurrentUserLogItems(){
    console.log('RETURNING All USER LOG ITEMS') 

    let allUserLogs= {
      'exercise' : this.exerciseItemList,
      'diet' : this.dietItemList, 
      'sleep' : this.sleepItemList, 
      'mood' : this.moodItemList
    }

    return allUserLogs
  }

/*

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
*/
  getAllUserInfo(): Observable<any> {
  console.log('RETURNING ALL USER INFO')
  console.log(this.allUserItems)
   return this.allUserItems
  }

  //CHANGE: ADD ASYNC PIPES
  getUserData(): Observable<any> {
    console.log('getUserData')
    console.log('USER DATA2')
    console.log(this.userData)
    console.log('USER LIST2')
    console.log(this.userList)
  
    return this.userDataObject.userData
  }

  //CHANGE: PLACE USER IMAGE ON SIDE

  updateUser(user) {
    console.log('UPDATING user ITEM')
    console.log(user)
    const userDBInfo = this.db.list(`Users/${this.userId}`);
    console.log(userDBInfo) 
   // userDBInfo.set( user);
  //  this.allUsersRef.update({ size: newSize });
  }

  deleteUser(logItem) {
   console.log('DELETING USER')
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