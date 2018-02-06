import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { lookupListToken } from '../providers';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service'
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
declare var jquery:any;
declare var $ :any;

export class DietItem { body: string; }

@Component({
  selector: 'app-log-diet-item-form',
  templateUrl: './log-diet-item-form.component.html',
  styleUrls: ['./log-diet-item-form.component.css']
})
export class LogDietItemFormComponent{

  addDietItemForm
  userId
  someRange2config: any = {
    behaviour: 'drag',
    start: [0, 100],
    range: {
      min: 0,
      max: 100
    },
    step: 1
  };

  constructor(private formBuilder: FormBuilder, private angularAuth: AngularFireAuth, 
    private router: Router, 
    private datastoreService: DatastoreService, 
    authService: AuthService,
  ) { 
    this.angularAuth.authState.subscribe((user) => {
      this.userId = user.uid;
    })
  }
  
  ngOnInit() {
    console.log('DIET FORM')    
    this.addDietItemForm = this.formBuilder.group({
      id: this.userId,
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      appetite: this.formBuilder.control('No Entry'),
      cupsOfCoffee: this.formBuilder.control('No Entry'),
      confectionary: this.formBuilder.control('No Entry'),
      alcoholDrank: this.formBuilder.control('No Entry'),
      cigarettesSmoked: this.formBuilder.control('No Entry'),
      supplements: this.formBuilder.control('No Entry'),
      additionalNotes: this.formBuilder.control('No Entry'),
    })
  }

  onSubmit() {
    if (this.addDietItemForm.valid) {
      this.datastoreService.addDietEntry(this.addDietItemForm.value)
      this.router.navigate(['/add'])
    }
  }
}
