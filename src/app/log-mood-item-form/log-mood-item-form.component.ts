import { Component, Inject, OnInit,Renderer2,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { lookupListToken } from '../providers';
import { NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service'
import { AngularFireAuth } from 'angularfire2/auth';
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
  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;
  addMoodItemForm
  userId

  constructor(private renderer: Renderer2,private formBuilder: FormBuilder, private angularAuth: AngularFireAuth, 
    private router: Router, 
    private datastoreService: DatastoreService) {  
    this.angularAuth.authState.subscribe((user) => {
      this.userId = user.uid;
    })
  }

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

  firstHandle: Element;

  ngOnInit() {
    console.log('MOOD FORM')
    this.addMoodItemForm = this.formBuilder.group({
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      generalMood: this.formBuilder.control( { 'single': [30] }),
      energyLevel: this.formBuilder.control(null),
      motivationLevel: this.formBuilder.control('50'),  
      concentrationLevel: this.formBuilder.control(null),
      anxietyLevel: this.formBuilder.control(null),
    })
  }

  onUpdate(event) {
   // this.renderer.setStyle(this.firstHandle, 'background', 'rgb(255, 255, ' + event[0] + ')'); //0 - handle index
  }

  onSubmit() {
    if (this.addMoodItemForm.valid) {
      console.log('FORM')
      console.log(this.addMoodItemForm.value)
      this.datastoreService.addMoodEntry(this.addMoodItemForm.value)
      this.router.navigate(['/add'])
    }
  }

  onUpdateMotivation($event){

    console.log($event)
    console.log($event.returnValue)

  }
}