import { Component } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { CommonModule } from '@angular/common';//CHANGE: IS THIS NEEDED?
import { AngularFireModule } from 'angularfire2';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
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
import {MatSidenavModule} from '@angular/material/sidenav'

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

        query(':enter',
          animate('300ms ease',
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
private route:ActivatedRoute,
public authService : AuthService,
private formBuilder: FormBuilder) {
    
this.isCollapsed = true;

}



clickedNav(){
  if (this.router.url == "/add") {
    console.log('current route is add - going to  ' + this.router.url)
    $("#navButton").fadeOut(200).attr("src","assets/images/add2.png").fadeIn(200)
    this.router.navigate(['/graph/overview'])
  }else{
    console.log('current route is graph - going to  ' + this.router.url)
    this.router.navigate(['/add'])
  }
}

ngOnInit() {
  
    $(".overlayToggle").click(function(){
      $(".overlay").fadeToggle(200);
    });

    $('.overlay').on('click', function(){
      $(".overlay").fadeToggle(200);   
      this.open = false;
      $(".navItem").fadeIn(200);
    })
    
    $(".navItem").fadeIn(400);
    $("#navButton").unbind()
    $("#navButton").fadeOut(200).attr("src","assets/images/add2.png").fadeIn(200)
   
    //JUST MOVED 
    //CHANGE: ALLOW USER UPDATE 
  if (this.authService.userPhotoURL){
    this.imagePath = this.authService.userPhotoURL}   
   // this.form = this.formBuilder.group({
     // name: this.formBuilder.control(this.authService.currentUserDisplayName),
     // signedUp: this.formBuilder.control(this.authService.currentUserSignedUpOn),
    //  email: this.formBuilder.control(this.authService.currentUserEmail)
    //})


    this.afAuth.authState.subscribe((auth) => {
      if(auth) { 
        this.auth = auth
        this.userid = auth.uid;
        console.log('APP COMPONENT LOAD -  SERVICE AUTH')
        console.log(auth)
        
        this.email = this.auth.email
        this.userID = this.auth.uid
        this.signedUpOn = this.dataInterpretorService.truncateDate(auth.metadata.creationTime)
        //this.displayName = this.auth.displayName
        this.lastSignIn = this.auth.lastSignIn
        this.photoURL = this.auth.photoURL
    
       // console.log('email - ' + this.email)
       // console.log('signedUpOn - ' + this.signedUpOn)
       // console.log('userID - ' + this.userID)
       // console.log('photoURL - ' + this.userID)
       // if (this.displayName == null){
         // this.displayName = 'Guest';
       // }
    
        
        if (this.photoURL == null){
          this.photoURL = '/assets/images/nobody.jpg';
        }
      }  
      //CHANGE: REMOVE 'USER' NODE IN USER DATA
    })
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
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
