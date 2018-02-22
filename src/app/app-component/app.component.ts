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
import { AsyncPipe } from '@angular/common';
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
import {MatExpansionModule} from '@angular/material/expansion';


declare var jquery:any;
declare var $ :any;

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'mw-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            transform: 'translateX(-100%)'
          }),
          {optional:true}),
        // move page off screen right on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateX(100%)'
            })
          ),
        {optional:true}),
        // move page in screen from left to right
        query(':enter',
          animate('500ms ease',
            style({
              opacity: 1,
              transform: 'translateX(0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})

export class AppComponent {

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


lastSignIn



public $userInfo: Observable<any>

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
    this.signedUpOn = this.auth.creationTime
    this.displayName = this.auth.displayName


    if (this.displayName == null){
      this.displayName = 'Guest';
    }

    this.photoURL = this.auth.photoURL
    if (this.photoURL == null){
      this.photoURL = '/assets/images/nobody.jpg';
    }

    this.lastSignIn = this.auth.lastSignIn
    console.log(auth)
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


    ///start



var colors = new Array(
  [120,2,6],
  [6,17,97],
  [34,35,98],
  [120,175,6],
  [67,0,255],
  [6,55,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.0005;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('body').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

    //setInterval(updateGradient,10);

  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

  openUserProfile(){  
    $('.profile-card').toggleClass('puff_landscape-active');  
    console.log('profile opened')
    console.log($('.profile-card'))
    if($('.profile-card').hasClass('active')){
      console.log($('has active class'))
      $('.profile-card').fadeOut(500)
      $('.addEntry').fadeIn(500)
      console.log($('fading out'))
    }else{   
      $('.addEntry').fadeOut(500)   
    }
  }

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
 
