import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { TreeModel, NodeEvent, Ng2TreeSettings } from 'ng2-tree';
import { ViewChild } from '@angular/core';
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
      //this.currentUserLogItems = datastoreService.allUserItems
     // console.log('GRAPH - get usrr items')
      //console.log(this.currentUserLogItems)
      //Object.assign(this, {single, multi}) 
      $(".navItem").fadeIn(200); 
  }

   public logEvent(e: NodeEvent): void {
    console.log(e);
    console.log(e.node.value);

    ///CHANGE: COLOR OF NODES
    //CHANGE: CLOSE TREE ON STARTUP


      if (e.node.value === 'Overview'){
        this.router.navigate(['/graph/overview']);
      }else if (e.node.value === 'Excercise Entries'){
        this.router.navigate(['/graph/excerciseGraph']);
      }else if (e.node.value === 'Dietary Entries'){
        this.router.navigate(['/graph/dietGraph']);
      }else if (e.node.value === 'Mood Entries'){
        this.router.navigate(['/graph/moodGraph']);
      }else if (e.node.value === 'Sleep Entries'){
        this.router.navigate(['/graph/sleepGraph']);
      }else if (e.node.value === 'Correlation A'){
        this.router.navigate(['/graph/analysisGraph']);
      }else if (e.node.value === 'General Mood'){
        this.router.navigate(['/graph/generalMoodGraph']);
      }else if (e.node.value === 'Appetite Level'){
        this.router.navigate(['/graph/appetiteLevelGraph']);
      }else if (e.node.value === 'Sleep Quality'){
        this.router.navigate(['/graph/sleepQualityGraph']);
      }else if (e.node.value === 'Energy Level'){
        this.router.navigate(['/graph/energyLevelGraph']);
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
          'expanded': 'fa fa-caret-down fa-lg nodeExpanded',
          'collapsed': 'fa fa-caret-right fa-lg nodeCollapsed',
          'leaf': 'fa fa-lg nodeCollapsed',
          'empty': 'fa fa-caret-right disabled nodeCollapsed'
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
          value: 'Diet',
          children: [
            {value: 'Dietary Entries'},
            {value: 'Appetite Level'},
          ]
        },
        {
          value: 'Excercise',
          children: [
            {value: 'Excercise Entries'},
            {value: 'Energy Level'},
          ]
        },
        {
          value: 'Mood',
          children: [
            {value: 'Mood Entries'},
            {value: 'General Mood'},
          ]
        },
        {
          value: 'Sleep',
          children: [
            {value: 'Sleep Entries'},
            {value: 'Sleep Quality'},
          ]
        },
        {
          value: 'Analysis',
          children: [
            {value: 'Correlation A'},
          ]
        }
    ]}

    @ViewChild('treeComponent') treeComponent;

    handleCreated($event){
      console.log('created node')
      //const oopNodeController = this.treeComponent.getControllerByNodeId(2);
    }

    handleExpanded($event){
      console.log('node exaopnded')

      console.log($event)
      const oopNodeController = this.treeComponent.getControllerByNodeId(2);
      oopNodeController.select();
      oopNodeController.collapse();
      oopNodeController.expand();
    }

  handleSelected($event){
    console.log(event)
    console.log($event)
  }

  //CHANGE HOVER OVER CHART
 
  onSelect(event) {
    console.log(event);
  }

  ngOnOnit(){
    $(".navItem").fadeIn(200); 
    $('#tree1').treed();
  }
}
