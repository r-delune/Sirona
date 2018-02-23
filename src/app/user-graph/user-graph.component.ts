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
  view: any[] = [1700, 1400]
  showLegend = false;

  treeSettings: Ng2TreeSettings = {
    rootIsVisible: false
  }

  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  public tree: TreeModel = 
  {
    value: 'Data Tree',
    settings: {
     // 'isCollapsedOnInit': true,
      'static': true,
      'rightMenu': true,
      'leftMenu': true,
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
      }
      },    
    children: [
      {
        value: 'Overview',
      },
      {
        value: 'Analysis'
      },
      {
        value: 'Diet/Exercise',
        children: [
          {value: 'Diet/Exercise Overview'},
          {value: 'All Diet/Exercise Data'},
        ]
      },
      {
        value: 'Mood',
        children: [
          {value: 'Mood Overview'},
          {value: 'All Mood Data'},
        ]
      },
      {
        value: 'Sleep',
        children: [
          {value: 'Sleep Overview'},
          {value: 'All Sleep Data'}
        ]
      }
  ]}

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private router: Router) { 
      $(".navItem").fadeIn(200); 
      $('.addEntry').fadeIn(500)
  }

   public logEvent(e: NodeEvent): void {
    console.log(e);
      if (e.node.value === 'Overview'){
        this.router.navigate(['/graph/overview']);
      }else if (e.node.value == 'Analysis'){
        this.router.navigate(['/graph/analysisGraph']);
      }else if (e.node.value == 'All Mood Data'){
        this.router.navigate(['/graph/generalMoodGraph']);
      }else if (e.node.value == 'Mood'){
        this.router.navigate(['/graph/generalMoodGraph']);
      }else if (e.node.value == 'Mood Overview'){
        this.router.navigate(['/graph/moodGraph']);
      }else if (e.node.value == 'All Diet/Exercise Data'){
        this.router.navigate(['/graph/appetiteLevelGraph']);
      }else if (e.node.value == 'Diet/Exercise Overview'){
        this.router.navigate(['/graph/dietGraph']);
      }else if (e.node.value == 'Diet/Exercise'){
        this.router.navigate(['/graph/appetiteLevelGraph']);
      }else if (e.node.value == 'All Sleep Data'){
        this.router.navigate(['/graph/sleepQualityGraph']);
      }else if (e.node.value == 'Sleep'){
        this.router.navigate(['/graph/sleepQualityGraph']);
      }else if (e.node.value == 'Sleep Overview'){
        this.router.navigate(['/graph/sleepGraph']);
    }}
    //CHANGE HOVER OVER CHART

    ngOnOnit(){
      $('.addEntry').fadeIn(1000)
    }
}
