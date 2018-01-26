
import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireObject} from 'angularfire2/database/interfaces';
import { AngularFireModule} from 'angularfire2';
import { Observable } from 'rxjs/Observable';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {

  authState: any = null;
  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private afs: AngularFireModule,
              private router:Router) {



                this.afAuth.authState.subscribe((auth) => {
                  this.authState = auth;
                  console.log('AUTH:')
                  console.log(this.authState)
              });


    this.user = this.afAuth.authState
    .switchMap(user => {
      if (user) {
        return this.db.object('Users/${user.uid}').valueChanges()
      } else {               
        console.log('ERRORROROROR')        
        //return AngularFireObject.of(null)
        return 'ERRRR'
      }
    })
  }

  private oAuthLogin(provider) {

    console.log('oAuth lofin')

    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    const userRef: Observable<any> = this.db.object('Users/${user.uid}').valueChanges()
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }     
  
    return 'NOTHING HERE'
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

  // Returns current user data
  get currentUser(): any {
    console.log('getting current user')
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    console.log('getting current user observable')
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    console.log('getting current user id')
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
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

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string) {

    console.log('signing up via email:')
    console.log(email)
    console.log(password)

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
    //    this.updateUserData()
        console.log('signed up siccessfully')
        this.router.navigate(['/profile']);
      })
      .catch(error => console.log(error));
  }

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