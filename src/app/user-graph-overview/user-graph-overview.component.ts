import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
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
  view: any[] = [800, 450];
  showLegend = true;
  showLabels = true;
  explodeSlices = true;
  doughnut = true;

  colorScheme = "fire"

  constructor(authService: AuthService,
    private dataInterpretorService: DataInterpretorService) {   
      
      $(".navItem").fadeIn(200);
      $(".menuItems").fadeIn(200);
      console.log('overview constructor')
      this.data = this.dataInterpretorService.getAllUserLogCountData().data1
      //this.data = this.data.data1
      console.log('overview')
      console.log(this.data )
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngAfterViewInit(){



  }
  
}
