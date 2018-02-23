import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireObject} from 'angularfire2/database/interfaces';
import { AngularFireModule} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { DatastoreService } from './datastore.service';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  signedUpOn: Date,
  lastSignIn: Date
}

@Injectable()
export class AuthService {

  authState: any = null;
  user: Observable<any>;
  currentUserLogsItems: Observable<any>
  authServiceState: any = null;
  
  users

  signInErr
  signUpErr
  err
  userId 
  userEmail
  userDisplayName
  userPhotoURL
  currentUsersRef

  currentUserLogsRef
  userIdAuth: any = null;
  
  currentUsersItem
  userItemsList

  currentUserLogsRefList
  currentUserLogsItemsList: Observable<any>
  auth

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;
  
  //CHANGE: DENOTE OBSERVABLES WITH DOLLAR SIGN

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFireModule,
    private router:Router){
     // this.currentUsersRef = db.object('Users/'+this.userId+'');
     // this.currentUsersItem = this.currentUsersRef.valueChanges();
      this.afAuth.authState.subscribe((auth) => {
        console.log('AUTH SERVICE auth is')
        console.log(auth)
        if(auth == null){
          console.log('No user found')
          this.router.navigate(['/login'])
        }else{
          //CHANGE: COMPLETE THIS
          this.isLoggedIn = true;
          console.log('User found - moving to graph')
          this.router.navigate(['/graph/overview'])
         // this.user_displayName = auth.google.displayName;
         // this.user_email = auth.google.email;
        }
    })
  }

  private oAuthLogin(provider) {
    console.log('oAuth login')

    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  signOut() {   
    this.afAuth.auth.signOut().then(() => {
      console.log('SIGNING OUT')
        this.router.navigate(['/login']);
    });
  }
      
  get authenticated(): boolean {
    console.log('checking if authenticated')
    console.log(this.authState)
    return this.authState !== null;
  }

  get currentUser(): any {
    console.log('getting current user')
    return this.authenticated ? this.authState : null;
  }

  get currentUserLogItems(): Observable<any> {
    if (!this.userId){ 
      //console.log('GETTING LOGS  - no user id!'); return false
    }else{
      console.log('GETTING LOGS  - no user id!')
      console.log(this.currentUserLogsItems)
      return this.currentUserLogsItemsList
    } 
  }

  get currentUserObservable(): any {
    console.log('getting current user observable')
    console.log(this.authState)
    return this.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    console.log('getting current user id')
    console.log(this.userId)
    return  this.userId
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    return this.authState['displayName']
  }
  //CHANGE: 
  get currentUserEmail(): string {
    return this.authState['email']
  }

  get currentUserSignedUpOn(): string {
    return this.authState.metadata['creationTime']
  }

  get currentUserLastSignIn(): string {
    return this.authState.metadata['lastSignInTime']
  }

  get currentUserProfileURL(): string {
    return this.authState['photoURL']
  }

  //// Social Auth ////

  googleLogin() {
    console.log('logging in via google')
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin() {
    console.log('loggin in via facebook')
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    console.log('loggin in via twitter')
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user
     //     this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    console.log('signing in anonymously')

    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user
    //  this.updateUserData()
    })
    .catch(error => console.log(error));
  }

  getUserItemsList(): Observable<any[]>{
    this.users = this.db.list(`Users/${this.userId}`)
    console.log('MY users ITEMS')
    console.log(this.users)
    return this.users;
  }

  getUser(){
    console.log('GETTING USER')
    return this.afAuth
  }

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string, displayName:string) {

    console.log('signing up via email:')
    console.log(email)
    console.log(password)
    

   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('signed up siccessfully')
        console.log('NEW USER')
        console.log(user)
        this.authState = user
        
        var userData = {
          uid: user.uid,
          email: user.email,
          signedUpOn: new Date(Date.now()).toLocaleString(),
          displayName: displayName,
          photoURL: "/assets/images/nobody.jpg"
        }     

        const afList = this.db.list(`Users/${user.uid}`);
        afList.push({ userData });

        this.updateUserData(userData)
        this.emailLogin(user.email,password) 
      })
      .catch(error => {
        console.log(error)
      });
  }


  //CHANGE: UPDATE DATA NOT WORKING
  updateUserData(userData) {
    
    console.log('UPDATING USER DATA')
    console.log(userData)
    
    if (userData.displayName){
      console.log('updating display name to ' + userData.displayName)
    //  const itemRef = this.db.object(`Users/${userData.uid}`)[0];
    //  itemRef.update({ displayName: userData.displayName });
    }

    if (userData.photoURL){
      console.log('updating display name to ' + userData.photoURL)
    //  const itemRef = this.db.object(`Users/${userData.uid}`);
    //  itemRef.update({ photoURL: userData.photoURL });
    }

    if (userData.lastSignIn){
      console.log('updating display name to ' + userData.lastSignIn)
    //  const itemRef = this.db.object(`Users/${userData.uid}`);
    //  itemRef.update({ lastSignIn: userData.lastSignIn });
    }
  }

  //CHANGE: REMOVE OTHER LOGIN FUCNTIONS
  emailLogin(email:string, password:string) {
    console.log('signing in via email:')
    return 'Hello'
  }

  //CHANGE: MAYBE ONLY USE PROVIDEDATA FUNCTION IN ANGULARAUTH
  resetPassword(email: string) {
    var auth = firebase.auth();
    console.log('resetting passwword')
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
}