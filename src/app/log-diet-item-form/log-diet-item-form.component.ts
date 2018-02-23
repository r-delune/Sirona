import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service'
import * as firebase from 'firebase/app';
import { NouisliderModule } from 'ng2-nouislider';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-log-diet-item-form',
  templateUrl: './log-diet-item-form.component.html',
  styleUrls: ['./log-diet-item-form.component.css']
})
export class LogDietItemFormComponent{

  addDietItemForm
  someRange2config: any = {
    behaviour: 'drag',
    start: 50,
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    animate: true,
    animationDuration: 300
  };

  coffeeConfig: any = {
    behaviour: 'drag',
    start: 0,
    range: {
      min: 0,
      max: 20
    },
    step: 1,
    animate: true,
    animationDuration: 300
  };

  alcoholConfig: any = {
    behaviour: 'drag',
    start: 0,
    range: {
      min: 0,
      max: 500
    },
    step: 1,
    animate: true,
    animationDuration: 300
  };

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private datastoreService: DatastoreService
  ) {}
  
  ngOnInit() {
    console.log('DIET FORM')    
    this.addDietItemForm = this.formBuilder.group({
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      appetite: this.formBuilder.control(null),
      cupsOfCoffee: this.formBuilder.control(null),
      alcoholDrank: this.formBuilder.control(null),
      kmRan: this.formBuilder.control(null),
      kmCycled : this.formBuilder.control(null)
    })
  }

  onSubmit() {
    if (this.addDietItemForm.valid) {
      console.log(this.addDietItemForm)
      this.datastoreService.addDietEntry(this.addDietItemForm.value)
      this.router.navigate(['/add'])
    }
  }

  onChange($event){
    console.log($event)
  }
}
