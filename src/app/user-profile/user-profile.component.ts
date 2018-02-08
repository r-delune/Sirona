import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { DatastoreService } from '../services/datastore.service';
import { Validators, FormBuilder } from '@angular/forms';
import { DataInterpretorService } from '../services/data-interpretor.service';
declare var jquery:any;
declare var $ :any;

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

//CHANGE: EXPORT USER CLASS TO FILE
export class UserProfileComponent {

  users: Observable<any>;
  log: Observable<any>;
  form;
  usersRef
  userRef
  logRef
  authState
  userID
  currentUserInfo
  userEntryCount;
  imagePath
  email
  signedUpOn
  displayName
  photoURL
  allUserEntries
  authenticated
  auth
  totalUserEntries
  myImage : string = "/assets/images/nobody.jpg";
  selectedOption: string;
  user
  userData

  constructor(
    private datastoreService: DatastoreService,  
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public dataInterpretorService: DataInterpretorService,
    db: AngularFireDatabase) {
      
      this.userEntryCount = this.dataInterpretorService.countUserTotalEntries()
      this.userData = this.datastoreService.getUserData()

      //CHANGE: REMOVE 'USER' NODE IN USER DATA
      console.log('this.userDataPROFILE')
      console.log(this.userData)
      console.log(this.userData.userData)
      console.log('EMAIL')
      console.log(this.userData.email)
      console.log(this.userData.userData)

      this.email = this.userData.email
      this.userID = this.userData.uid
      this.signedUpOn = this.userData.signedUpOn
      this.displayName = this.userData.displayName
      this.photoURL = this.userData.photoURL

      console.log('PROFILE: userEntryCount')
      console.log(this.userEntryCount)

      //CHANGE: ADD NOBODY IMAGE TO PAGE ON LOAD
      if (this.authService.userPhotoURL){
        console.log('thismyImage')
        this.imagePath = this.authService.userPhotoURL}
    }

    OnInit () {
      $(".navItem").fadeIn(200);
      
      if (this.authService.userPhotoURL){
        console.log('thismyImage')
        this.imagePath = this.authService.userPhotoURL}   
        this.form = this.formBuilder.group({
          name: this.formBuilder.control(this.authService.currentUserDisplayName),
          signedUp: this.formBuilder.control(this.authService.currentUserSignedUpOn),
          email: this.formBuilder.control(this.authService.currentUserEmail)
        })
    }

    onSubmit(){
      console.log('updating user info')
    }

    onChange(event) {
      var files = event.srcElement.files;
      var img = URL.createObjectURL(event.target.files[0]);
      console.log(files);
      console.log(img);
      this.imagePath = img


      this.user = {
        'uid' : this.userID,
        'email' : this.email, 
        'photoURL' : this.imagePath, 
        'displayName' : this.displayName
      }
      
      this.datastoreService.updateUser(this.user)
    }
}