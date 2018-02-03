import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatastoreService } from '../services/datastore.service';
import { AuthService } from '../services/auth.service';
import {  OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';


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
export interface Item { name: string; userId: string }

declare var jquery:any;
declare var $ :any;

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  form;
  authState
  showNav = true;
  error
  newUser

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService, 
    private datastoreService: DatastoreService,
    db: AngularFireDatabase, 
    afc: AngularFirestore,
    af: AngularFireAuth,
    afi: AngularFireAuthModule, 
    private router: Router
  ) { }


  ngOnInit() {

   // $(".navItem").fadeOut(200);

    this.form = this.formBuilder.group({
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      displayName: this.formBuilder.control('')
     // sex: this.formBuilder.control('50'),
    })
  }

  onRegister(form) {
    console.log('submitting form')
    console.log(form)
    console.log(form.email)
    console.log(form.email.toLocaleString())
    this.error = this.authService.emailSignUp(form.email.toLocaleString(), form.password.toLocaleString(), form.displayName.toLocaleString())
    .then((user) => {

      console.log('REG FORM: Success')
      console.log(this.authService)

      const data: User = {
        uid: this.authService.userId,
        email: this.authService.userEmail
      }    
      
      const data1 = {
        email: form.email,
        displayName: form.displayName,
        date: form.date
      }   

      //this.newUser = this.authService.authState.user

      this.datastoreService.addUser(data1)
    })
    .catch(error => $(".registrationError").text(error))

    console.log('Attempted to register')
    console.log(this.error)

    $(".registrationError").text(this.error)
 }

  percentageValidator(control){
    return { 
    'inputValue': {
    min: 0,
    max: 0
    }}
  }

    

}
