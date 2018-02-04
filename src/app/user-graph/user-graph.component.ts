import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { TreeModel, NodeEvent, Ng2TreeSettings } from 'ng2-tree';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
declare var Timeline: any;

var treed: any;

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})

export class UserGraphComponent  {
  translation: string;
  outerRadius: number;
  innerRadius: number;
  data: any;
  domain: any;
  dims: any;
  margin = [20, 20, 20, 20];
  legendOptions: any;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }; 

  logItems = []
  currentUserLogItems

  single: any[];
  multi: any[];

  view: any[] = [1700, 1400];
  // options
  showLegend = false;

   treeSettings: Ng2TreeSettings = {
    rootIsVisible: false

  }

  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  
  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private router: Router) { 
      this.currentUserLogItems = datastoreService.allUserItems
      console.log('GRAPH - get usrr items')
      console.log(this.currentUserLogItems)
      Object.assign(this, {single, multi})  
  }

   public logEvent(e: NodeEvent): void {
    console.log(e);
    console.log(e.node.value);
      if (e.node.value === 'Overview'){
        console.log('Moving to ovierview')
        this.router.navigate(['/graph/overview']);
      }else if (e.node.value === 'Excercise'){
        console.log('Moving to excercise')
        this.router.navigate(['/graph/excerciseGraph']);
      }else if (e.node.value === 'Dietary'){
        console.log('Moving to Dietary')
        this.router.navigate(['/graph/dietGraph']);
      }else if (e.node.value === 'Mood'){
        console.log('Moving to moods')
        this.router.navigate(['/graph/moodGraph']);
      }else if (e.node.value === 'Sleep'){
        console.log('Moving to Sleep')
        this.router.navigate(['/graph/sleepGraph']);
      }else if (e.node.value === 'Analysis'){
        console.log('Moving to Dietary')
        this.router.navigate(['/graph/analysisGraph']);
      }
    }
    

    
    public tree: TreeModel = 
    {
      value: 'Prototype-based programming',
      settings: {
        'static': true,
        'rightMenu': true,
        'leftMenu': true,
       // 'isCollapsedOnInit' : true,
        'cssClasses': {
          'expanded': 'fa fa-caret-down fa-lg',
          'collapsed': 'fa fa-caret-right fa-lg',
          'leaf': 'fa fa-lg',
          'empty': 'fa fa-caret-right disabled'
        },
        'templates': {
          'node': '<i class="fa fa-folder-o fa-lg"></i>',
          'leaf': '<i class="fa fa-file-o fa-lg"></i>',
          'leftMenu': '<i class="fa fa-navicon fa-lg"></i>'
        },
        'menuItems': [
           // { action: NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
          //  { action: NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
          //  { action: NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right'}
          ]
        },
      
      children: [
        {
          value: 'Overview',
        },
        {
          value: 'Dietary',
          children: [
            {value: 'All'},
            {value: 'Evening'},
            {value: 'Morning'}
          ]
        },
        {
          value: 'Excercise',
          children: [
            {value: 'All'},
            {value: 'Evening'},
            {value: 'Morning'}
          ]
        },
        {
          value: 'Mood',
          children: [
            {value: 'All'},
            {value: 'Evening'},
            {value: 'Morning'}
          ]
        },
        {
          value: 'Sleep',
          children: [
            {value: 'All'},
            {value: 'Evening'},
            {value: 'Morning'}
          ]
        },
        {
          value: 'Analysis',
          children: [
            {value: 'All'},
            {value: 'Evening'},
            {value: 'Morning'}
          ]
        }
    ]}
  
      
    

      handleSelected($event){
        console.log(event)
        console.log($event)
        // switch(event.returnValue) {
        // case event.returnValue == 'Login':
            //code block
        //      break;
        //  case n:
           // code block
    //        break;
       // default:
           // code block
    }

  
  onSelect(event) {
    console.log(event);
  }

  ngOnOnit(){
    $('#tree1').treed();


  }
}
