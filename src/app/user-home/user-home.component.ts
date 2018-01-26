import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { LogItemService } from '../services/log-item.service';
import { lookupListToken } from '../providers';

import { AngularFireDatabase, AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AngularFireAction } from '@angular/cli'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent implements OnInit {

    userRef: AngularFireObject<any>;
    userLogRef: AngularFireObject<any>;
    logItems: Observable<any>;
    userItems: Observable<any>;

    
    constructor(
      private logItemService: LogItemService,  
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private router: Router,
      db: AngularFireDatabase) {
        this.userRef = db.object('0/Users');
        this.userLogRef = db.object('0/Logs');
        this.userItems = this.userRef.valueChanges();
        this.logItems = this.userLogRef.valueChanges();

        console.log('HOME PAGE DIRECT')
        console.log(this.userItems)
        console.log(this.logItems)

        console.log('HOME PAGE FROM SERVICE')
        console.log(this.userItems)
        console.log(this.logItems)

        console.log(firebase.auth().currentUser)
      }
  
    ngOnInit() {

      console.log('home page loaded')
      
      
      this.authService.anonymousLogin().then((data) => {
        this.router.navigate(['']);
      })
      
      this.logItems.subscribe((userItems) => {
        console.log('Home User items')
        console.log(userItems) 
      });

      this.userItems.subscribe((logItems) => {
        console.log('Home Log items')
        console.log(logItems) 
      });
    }
  }