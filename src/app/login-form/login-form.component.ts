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

export interface Item { name: string; }
declare var jquery:any;
declare var $ :any;

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
  showNav = true;
  error
  jsonErr

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    $(".navItem").fadeOut(200);
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
    this.error = this.authService.emailLogin(form.email.toLocaleString(), form.password.toLocaleString()) 
    //.catch(error => {
     // console.log('Error handler')
    //  console.log(error)
    //  $(".loginError").text(error.message)
   // })

   if (form.email == "" || form.name == ""){
    console.log('form is invalid'); 
    console.log(form); 
    $(".loginError").text('Invalid login.')
  }
  }
}

