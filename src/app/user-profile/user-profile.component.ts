import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  users : Observable<any>;
  user: Observable<any>;
  log: Observable<any>;

  usersRef
  userRef
  logRef
  authState

  constructor(
    private datastoreService: DatastoreService,  
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    db: AngularFireDatabase) {

        this.afAuth.authState.subscribe((auth) => {
          this.authState = auth
          console.log('USER auth state is')
          console.log(this.authState)
        });

        this.datastoreService.getAllLogItems().subscribe(logItemArray => {console.log('USER PAGE, FROM SERVICE, Constructor, user'); console.log(logItemArray)});
        this.datastoreService.getAllUserInfo().subscribe(UserItemArray => {console.log('USER PAGE, FROM SERVICE, Constructor, log'); console.log(UserItemArray)});
      }
}