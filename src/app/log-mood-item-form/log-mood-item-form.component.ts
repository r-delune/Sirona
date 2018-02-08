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
    connect: false,
    start: [0, 100],
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    animate: true,
    animationDuration: 300,
    cssClasses: {
			target: 'target',
				base: 'base',
				origin: 'origin',
				handle: 'handle',
				handleLower: 'handle-lower',
				handleUpper: 'handle-upper',
				horizontal: 'horizontal',
				vertical: 'vertical',
				background: 'background',
				connect: 'connect',
     }
  };

  

  firstHandle: Element;

  ngOnInit() {
    console.log('MOOD FORM')
    this.addMoodItemForm = this.formBuilder.group({
      id: this.userId,
      date: this.formBuilder.control(new Date(Date.now()).toLocaleString()),
      generalMood: this.formBuilder.control('No Entry'),
      energyLevel: this.formBuilder.control('No Entry'),
      motivationLevel: this.formBuilder.control('No Entry'),  
      concentrationLevel: this.formBuilder.control('No Entry'),
      anxietyLevel: this.formBuilder.control('No Entry'),
      stressEvents: this.formBuilder.control('No Entry'),
      extEffectOnMood: this.formBuilder.control('No Entry'),
      additionalNotes: this.formBuilder.control('No Entry')
    })

    var connectSlider = document.getElementById('slider-connect');

    console.log('init mood')
    var trueSlider = document.getElementById('slider-animate-true'),
    falseSlider = document.getElementById('slider-animate-false'),
    setButton = document.getElementById('set-sliders');
    
    
 

    var slider = document.getElementById('slider');
    noUiSlider.create(slider, {
     start: [20, 80],
     connect: true,
     step: 1,
     range: {
       'min': 0,
       'max': 100
     }
    });
    
  }

  onUpdate(event) {
    this.renderer.setStyle(this.firstHandle, 'background', 'rgb(255, 255, ' + event[0] + ')'); //0 - handle index
    }


  onSubmit() {
    if (this.addMoodItemForm.valid) {
      this.datastoreService.addMoodEntry(this.addMoodItemForm.value)
      this.router.navigate(['/add'])
    }
  }
}