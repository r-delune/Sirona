import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatastoreService } from '../services/datastore.service';
import { AuthService } from '../services/auth.service';
import { OnInit, HostBinding } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';
import { AngularFireAuth } from 'angularfire2/auth';

export interface Item { name: string; }
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'mw-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

export class LoginFormComponent {
  form;
  showNav = true;
  error
  jsonErr

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService, 
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    //CHANGE: FADE OUT MENU BEFORE LOGIN
   $(".navItem").fadeOut(200);
   
   $(".menuItems").fadeOut(200);
    this.form = this.formBuilder.group({
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }

  //CHANGE: NEST LOGIN/REGISTER FOR COOL ANIMATION, GLOW TXT, FLIP TEXT FROM LOGIN/REGISTER
  percentageValidator(control){
    return { 
    'inputValue': {
    min: 0,
    max: 0
    }}
  }

  googleLogin() {
    this.authService.googleLogin()
  }

  facebookLogin() {
    this.authService.facebookLogin()
  }

  onSubmit(form){

    if (form.email == "" || form.name == ""){
      console.log(form); 
      $(".loginError").text('Invalid login.')
      return
    }

   this.afAuth.auth.signInWithEmailAndPassword(form.email.toLocaleString(), form.password.toLocaleString())
   .then((user) => {
    // this.authState = user

    // let userData = {
   //    lastSignIn: Date.now().toLocaleString()
    // } 
     //CHANGE: ALLOW FOR LAST SIGN IN DATE
     //this.updateUserData(userData)
     console.log('logged in siccessfully')
     this.router.navigate(['/graph/overview']);
   })
   
   .catch(error => 
     {
      $(".loginError").text(error.message)
     });

    console.log('RETURN')
    console.log(this.error)    
    $.each(this.error, function(key, value) {
      console.log(key);  console.log(value)    
  })
  }
}

