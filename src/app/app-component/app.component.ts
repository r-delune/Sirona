import { Component } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { Router, RouterModule } from '@angular/router';
import { AngularFireDatabase, AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireObject } from 'angularfire2/database';
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
import { Item } from '../log-item-form/log-item-form.component';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { DatastoreService } from '../services/datastore.service';
import { AuthService } from '../services/auth.service';

declare var jquery:any;
declare var $ :any;

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
userGreeting
    
constructor(db: AngularFireDatabase,
public afAuth: AngularFireAuth,
private router: Router,
private datastoreService: DatastoreService,
public authService : AuthService) {
    
this.isCollapsed = true;

this.afAuth.authState.subscribe((auth) => {
  if(auth) { 
    this.userid = auth.uid;
    
    if (auth.displayName){
      this.userGreeting = 'Welcome back' +auth.displayName+ ''
    }else{
      this.userGreeting = ''
    }
  }  
})}

ngOnInit() {
  //$(".navItems").fadeIn(200);
    $(".overlayToggle").click(function(){
      $(".overlay").fadeToggle(200);
      $(this).toggleClass('btn-open').toggleClass('btn-close');
    });

    $('.overlay').on('click', function(){
      $(".overlay").fadeToggle(200);   
      $(".button .overlayToggle a").toggleClass('btn-open').toggleClass('btn-close');
      this.open = false;
    })
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

  logout(){
    console.log('app component logging out')
  }
}
 
