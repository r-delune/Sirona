import { Component } from '@angular/core';


// Do not import from 'firebase' as you'd lose the tree shaking benefits

import {Observable} from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
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
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  
  constructor(db: AngularFireDatabase) {
    console.log(this.size$)
    console.log(this.size$)
    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.switchMap(size =>
      db.list('/items', ref =>
        size ? ref.orderByChild('size').equalTo(size) : ref
      ).snapshotChanges()
    );
  }
  filterBy(size: string|null) {
    this.size$.next(size);
  }

 }
