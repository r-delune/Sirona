import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { DatastoreService } from '../services/datastore.service';
import { Validators, FormBuilder } from '@angular/forms';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  users: Observable<any>;
  user: Observable<any>;
  log: Observable<any>;
  form;
  usersRef
  userRef
  logRef
  //user;
  authState
  userID
  currentUserInfo
  userEntryCount;
  imagePath

  constructor(
    private datastoreService: DatastoreService,  
    public authService: AuthService,
    public formBuilder: FormBuilder,
    db: AngularFireDatabase) {
      this.userEntryCount = this.datastoreService.getUserLogItems.length
      console.log('userEntryCount')
      console.log(this.userEntryCount)

    }

    OnInit () {



      if (this.authService.currentUserProfileURL != null)
      this.imagePath = this.authService.currentUserProfileURL
      else
        this.imagePath = "assets/img/nobody.jpeg";
      

      console.log('profile has initiated')
   //   $(".navItem").fadeOut(200);
      this.form = this.formBuilder.group({
        name: this.formBuilder.control(this.authService.currentUserDisplayName),
        signedUp: this.formBuilder.control(this.authService.currentUserEmail),
        email: this.formBuilder.control(this.authService.currentUserId)
      })
    }

    onSubmit(){
      console.log('updating user info')
      //NEED TO UPDATE FIREBASE USER, OBSERVABLE SHOULD CHANGE USER DATA IN BACKEND

    }

    logout(){
      this.authService.signOut()
    }
}