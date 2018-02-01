import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-user-graph-mood',
  templateUrl: './user-graph-mood.component.html',
  styleUrls: ['./user-graph-mood.component.css']
})
export class UserGraphMoodComponent  {
  logItems = []
  currentUserLogItems
 
  single: any[];
  multi: any[];

  view: any[] = [700, 400];
  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  
  constructor(authService: AuthService,
    private datastoreService: DatastoreService) { 

      this.currentUserLogItems = datastoreService.allUserItems
      console.log('GRAPH - get usrr items')
      console.log(this.currentUserLogItems)
      Object.assign(this, {single, multi})   
    }
  
  onSelect(event) {
    console.log(event);
  }

}
