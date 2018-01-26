import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LogItemService } from '../services/log-item.service';
import { AuthService } from '../services/auth.service';

import {  OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

import {  AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';;
import * as firebase from 'firebase/app';
export interface Item { name: string; }

@Component({
  selector: 'mw-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
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


export class LoginFormComponent {
  form;
  private logCollection: AngularFirestoreCollection<Item>;  
  items: Observable<Item[]>;
  public firebase;
  item: Observable<any>;
  logList: AngularFireList<any>;
  logItem;
  authState

  test: string = 'just a test';

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService, 
    db: AngularFireDatabase, 
    afc: AngularFirestore,
    af: AngularFireAuth,
    afi: AngularFireAuthModule, 
    private router: Router
  ) {
    this.logCollection = afc.collection<Item>('Users/0/log');
    this.items = this.logCollection.valueChanges();
    const collection: AngularFirestoreCollection<Item> = afc.collection('Users/0/log');  
    this.logList = db.list('Users/0/log');
    this.logItem = this.logList.valueChanges();

    //this.af.subscribe(auth => { 
    //  if(auth) {
    ///    this.router.navigateByUrl('/members');
    //  }
    //})
  }
  

  ngOnInit() {
    console.log(this.authService.test());
    this.form = this.formBuilder.group({
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      name: this.formBuilder.control('50', this.percentageValidator),
      password: this.formBuilder.control('50', this.percentageValidator)
      })
  }

  percentageValidator(control){
    return { 
    'inputValue': {
    min: 0,
    max: 0
    }}
  }

  onSubmit(item: Item) {
    console.log('submitting form')
    console.log(item)
  }

  googleLogin() {
    this.authService.googleLogin()
  }

  facebookLogin() {
    this.authService.facebookLogin()
  }

  emailLogin(email: string, pass: string){
    console.log('logincompeemnail')
    console.log(email)
    console.log(pass)
    this.authService.emailLogin(email, pass)
  }



}

