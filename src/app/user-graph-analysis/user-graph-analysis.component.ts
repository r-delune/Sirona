import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
import { single, multi} from '../data';
import { NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-user-graph-analysis',
  templateUrl: './user-graph-analysis.component.html',
  styleUrls: ['./user-graph-analysis.component.css']
})
export class UserGraphAnalysisComponent{

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

  // line, area
  autoScale = true;
  
  constructor(private datastoreService: DatastoreService) {
    Object.assign(this, {single, multi})   
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
    console.log('In dietary mode!')


    this.logItems = this.datastoreService.getAllLogItems()
    
    console.log('FINAL ARRAY')
    console.log(this.logItems)

    //this.logItemsList = this.datastoreService.getUserMoodItems()
    //console.log(this.logItemsList)

  }
}
