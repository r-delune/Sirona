import { Component } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { CommonModule } from '@angular/common';//CHANGE: IS THIS NEEDED?
import { AngularFireModule } from 'angularfire2';
import { Router, RouterModule } from '@angular/router';
import { AngularFireDatabase, AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireObject } from 'angularfire2/database';
import {FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';
import { AngularFireAction } from '@angular/cli'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { DatastoreService } from '../services/datastore.service';
import { AuthService } from '../services/auth.service';
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
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  authState: any = null;
  open;
  isCollapsed:boolean;
  userid
  userEntryCount
  userData
  email
  userID
  signedUpOn
  displayName
  photoURL
  imagePath
  user
  form
  auth
  $userInfo
  
  constructor(db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService,
    public authService : AuthService,
    private formBuilder: FormBuilder) {

    this.isCollapsed = true;

    this.afAuth.authState.subscribe((auth) => {
      if(auth) { 
        this.auth = auth
        this.userid = auth.uid;
        console.log('profileAuth')
        console.log(auth)
        this.email = this.auth.email
        this.userID = this.auth.uid
        this.signedUpOn = this.auth.signedUpOn
        this.displayName = this.auth.displayName
        this.photoURL = this.auth.photoURL
      }  
    
      this.userEntryCount = this.dataInterpretorService.countUserTotalEntries()
      //this.userData = this.datastoreService.getUserData()
      this.$userInfo = this.datastoreService.getUserData()
      //CHANGE: REMOVE 'USER' NODE IN USER DATA
      //console.log('Profile: this.userData')
      //console.log(this.userData)
      console.log('Profile: this.userInfoObserver')
      console.log(this.$userInfo)
     // console.log(this.userData.userData)
     // //console.log('EMAIL')
      //console.log(this.userData.email)
      //console.log(this.userData.userData)
    
      $('.profile-card').fadeOut(500)
    
      console.log('PROFILE: userEntryCount')
      console.log(this.userEntryCount)
    
      //CHANGE: ADD NOBODY IMAGE TO PAGE ON LOAD
      //if (this.authService.userPhotoURL){
      //  console.log('thismyImage')
      //  this.imagePath = this.authService.userPhotoURL}
    
    })}
    
    ngOnInit() {
      
        $(".overlayToggle").click(function(){
          $(".overlay").fadeToggle(200);
        });
    
        $('.overlay').on('click', function(){
          $(".overlay").fadeToggle(200);   
          this.open = false;
          $(".navItem").fadeIn(200);
        })
    
        $(".navItem").fadeIn(200);
    
      }
    
      getRouteAnimation(outlet) {
        return outlet.activatedRouteData.animation
      }
    
      openUserProfile(){
       
        $('.profile-card').toggleClass('puff_landscape-active');
       
        console.log('profile opened')
        console.log($('.profile-card'))
        if($('.profile-card').hasClass('active')){
         // $('.profile-card').toggleClass('puff_landscape-active');
          console.log($('has active class'))
          $('.profile-card').fadeOut(500)
          console.log($('fading out'))
        }else{}}
    
    OnInit () {
    //CHANGE: ALLOW USER UPDATE 
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
