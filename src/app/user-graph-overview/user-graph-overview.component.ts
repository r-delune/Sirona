import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-user-graph-overview',
  templateUrl: './user-graph-overview.component.html',
  styleUrls: ['./user-graph-overview.component.css']
})
export class UserGraphOverviewComponent  {
  translation: string;
  outerRadius: number;
  innerRadius: number;
  data: any;
  domain: any;
  dims: any;
  margin = [20, 20, 20, 20];
  legendOptions: any;

  logItems = []
  currentUserLogItems

  single: any[];
  multi: any[];

  view: any[] = [700, 400];
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
