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
}



@Injectable()
export class AuthService {

  authState: any = null;
  user: Observable<any>;
  currentUserLogsItems: Observable<any>
  authServiceState: any = null;
  
  users


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

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private afs: AngularFireModule,

              private router:Router) {

              this.currentUsersRef = db.object('Users/'+this.userId+'');
              this.currentUsersItem = this.currentUsersRef.valueChanges();

              this.afAuth.authState.subscribe((auth) => {
                  if (auth){ this.authState = auth;
                  this.userId = auth.uid
                  this.userEmail = auth.email
                  this.userDisplayName = auth.displayName
                  this.userDisplayName = auth.displayName
                  this.userPhotoURL = auth.photoURL
                  this.authServiceState = auth;
                  console.log('AUTH:')
                  console.log(this.authState) 
                }else{
                  console.log('USER IS NOT LOGGED IN')
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

   updateUserData(user) {

    console.log(user.userId)

    const userRef: Observable<any> = this.db.object(`Users/${user.userId}`).valueChanges()
   
    console.log('userRef')
    console.log(userRef)

    console.log(this.user)

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }      
    return data
  }




  signOut() {   
    this.afAuth.auth.signOut().then(() => {
      console.log('SIGNING OUT')
        this.router.navigate(['/login']);
    });
  }
      
  get authenticated(): boolean {
    console.log('checking if authenticated')
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
    // return this.authServiceState//
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
    console.log('logginf in via google')
    //const provider = new firebase.auth.GoogleAuthProvider()
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //return this.socialSignIn(provider);
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

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string, displayName:string) {

    console.log('signing up via email:')
    console.log(email)
    console.log(password)

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData(user)
       // this.datastoreService.addUser(user)
        console.log('signed up siccessfully')

        this.authState = user
      

        this.router.navigate(['/profile']);
      })
      .catch(error => console.log(error));
  }

   // addUser(user: User){
   //   console.log('CREATING USER')
   //   console.log(user)
   //   this.userItemsList.push(user)
    //this.allUsersRef.set({ name: item });
   // }



  emailLogin(email:string, password:string) {

    console.log('signing in via email:')
    console.log(email)
    console.log(password)

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
    //    this.updateUserData()
        console.log('logged in siccessfully')
        this.router.navigate(['/profile']);
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();
    console.log('resetting passwword')
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
}