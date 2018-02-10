import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
import { single, multi} from '../data';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { DataInterpretorService} from '../services/data-interpretor.service'
declare var jquery:any;
declare var $ :any;
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

  tooltipDisabled=true

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

  totalData
  data1
  appetiteData
  data2

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) {   
      $(".navItem").fadeIn(200);
      this.currentUserLogItems = datastoreService.allUserItems
      this.totalData = this.dataInterpretorService.getUserLogTimesByType('Diet')
      this.data = this.totalData.data1
      console.log('overview')
      console.log(this.data ) 
  }
  
  onSelect(event) {
    console.log(event);
  }

  customColors = [
    {
      name: "Morning",
      value: '#fff'
    },
    {
      name: "Evening",
      value: '#00ff00'
    }
];
  
}
