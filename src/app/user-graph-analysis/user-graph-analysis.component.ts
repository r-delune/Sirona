import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
import { single, multi} from '../data';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { DataInterpretorService } from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-analysis',
  templateUrl: './user-graph-analysis.component.html',
  styleUrls: ['./user-graph-analysis.component.css']
})
export class UserGraphAnalysisComponent{

  view: any[] = [700, 400];
  logItems
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Level';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  currentUserLogItems
  totalData
  data1
  data2
  appetiteData
  generalMoodData
  sleepQualityData
  energyLevelData
  data
  correlationOptionAData
  
  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

      this.data = this.dataInterpretorService.correlateDataOption1()
      console.log('data')
      console.log(this.data)
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
  }
}
