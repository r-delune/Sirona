import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

import { AngularFireAction } from '@angular/cli'
import { AngularFireAuthModule } from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

import * as firebase from 'firebase/app';
@Component({
  selector: 'mw-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

size;
items;

  constructor(db: AngularFirestore) {
    console.log(db)
    console.log(this.items)
    
    this.items = db.collection('moodItems').valueChanges();
    console.log(db.collection)
    console.log(db.collection('items'))

  }
  filterBy(size: string|null) {
    this.size.next(size);
  }

 }
