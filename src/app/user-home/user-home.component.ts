import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { lookupListToken } from '../providers';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent implements OnInit {
    
    constructor(
      private datastoreService: DatastoreService,  
      private authService: AuthService,
      private router: Router,
      db: AngularFireDatabase) {
        this.datastoreService.getAllLogItems().subscribe(logItemArray => {console.log('HOME PAGE, FROM SERVICE, IN CONSTRUCTOR'); console.log(logItemArray)});
        console.log(firebase.auth().currentUser)
      }
  
    ngOnInit() {

      console.log('home page loaded')

      this.authService.anonymousLogin().then((data) => {
        this.router.navigate(['']);
      })
    }
  }