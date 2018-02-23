import { Component, Inject, OnInit,Renderer2,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service'
import { NouisliderModule } from 'ng2-nouislider';
declare var jquery:any;
declare var noUiSlider:any;
declare var $ :any;

@Component({
  selector: 'app-log-mood-item-form',
  templateUrl: './log-mood-item-form.component.html',
  styleUrls: ['./log-mood-item-form.component.css']
})
export class LogMoodItemFormComponent {
  addMoodItemForm


  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private datastoreService: DatastoreService) { }

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

  ngOnInit() {
    console.log('MOOD FORM')
    this.addMoodItemForm = this.formBuilder.group({
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      generalMood: this.formBuilder.control( null), //{ 'single': [30] }
      energyLevel: this.formBuilder.control(null),
      motivationLevel: this.formBuilder.control(null),  
      concentrationLevel: this.formBuilder.control(null),
      anxietyLevel: this.formBuilder.control(null),
    })
  }

  onSubmit() {
    if (this.addMoodItemForm.valid) {
      console.log(this.addMoodItemForm.value)
      this.datastoreService.addMoodEntry(this.addMoodItemForm.value)
      this.router.navigate(['/add'])
    }
  }
}