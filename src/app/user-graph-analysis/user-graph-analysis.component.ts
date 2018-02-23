import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { DataInterpretorService } from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-analysis',
  templateUrl: './user-graph-analysis.component.html',
  styleUrls: ['./user-graph-analysis.component.css']
})
export class UserGraphAnalysisComponent{

  single: any[];
  multi: any[];

  view: any[] = [800, 450];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Level';
  showYAxisLabel = true;
  showGridLines = false;
  yAxisLabel = 'Date';
  referenceLines = [ {name: 'Low', value: 20}, {name: 'OK', value: 40}, {name: 'Great', value: "60"}]

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  schemeType="linear"
  // line, area
  autoScale = true;
  data

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.data = this.dataInterpretorService.correlateDataOption1()
    console.log('analysis data')
    console.log(this.data)
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){
  }
}
