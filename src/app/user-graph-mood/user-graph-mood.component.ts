import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-mood',
  templateUrl: './user-graph-mood.component.html',
  styleUrls: ['./user-graph-mood.component.css']
})
export class UserGraphMoodComponent  {
  logItems
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
  totalData
  data1

  data: any[];
  data2: any[];

  
  
  constructor(authService: AuthService,
    private dataInterpretorService: DataInterpretorService) { 

      this.totalData = this.dataInterpretorService.getUserLogTimesByType('Mood')
      this.data1 = this.totalData.data1
      this.data2 = this.totalData.data2

      //Object.assign(this, {data, data2})   
    }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
    console.log('In dietary mode!')


   // this.logItems = this.datastoreService.getUserDietItemsList('Mood')
    
    console.log('FINAL ARRAY')
    console.log(this.logItems)

    //this.logItemsList = this.datastoreService.getUserMoodItems()
    //console.log(this.logItemsList)

  }

}
