import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { Router, RouterModule } from '@angular/router';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabase, AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { NoopAnimationsModule } from '@angular/animations';
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
import { LogItemService } from '../services/log-item.service';
import { AuthService } from '../services/auth.service';

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

    itemRef: AngularFireObject<any>;
    item: Observable<any>;
    logItems;
    authState: any = null;
    authenticated

    
    constructor(db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private logItemService: LogItemService,
    private authService : AuthService) {
      this.itemRef = db.object('Users');
      //this.item = this.itemRef.valueChanges();
      this.logItems = this.logItemService.getLogItems()
      console.log('App logItems')
      console.log(this.logItems) 

      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth
        console.log('auth state is')
        console.log(this.authState)
      });
    }
  

    ngOnInit() {
      //this.item.subscribe((items) => {
      //  console.log('Appcomponent not using servcioe')
      //   console.log(items)
      // });
        this.logItems = this.logItemService.getLogItems()
        console.log('Appcomponent  servcioe')
        console.log(this.logItems)
    }

    getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation
    }
}
 
