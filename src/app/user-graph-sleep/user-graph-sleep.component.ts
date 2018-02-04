import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-sleep',
  templateUrl: './user-graph-sleep.component.html',
  styleUrls: ['./user-graph-sleep.component.css']
})
export class UserGraphSleepComponent implements OnInit {

  single: any[];
  multi: any[];
  view: any[] = [700, 400];
  logItems

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data1
  data2
  totalData
  // line, area
  autoScale = true;
  
  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.totalData = this.dataInterpretorService.getUserLogTimesByType('Mood')
    this.data1 = this.totalData.data1
    this.data2 = this.totalData.data2
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
  }
}
