import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataInterpretorService} from '../services/data-interpretor.service'

declare var jquery:any;
declare var $ :any;

export class mySingle {
  name: string;
  value: number
}

export class myMulti {
  name: string;
  series: [
    {
      name: string,  
      value: number
    },
    {
      name: string,  
      value: number
    },
    {
      name: string,  
      value: number
    },
    {
      name: string,  
      value: number
    }
  ] 
}

@Component({
  selector: 'app-user-graph-diet',
  templateUrl: './user-graph-diet.component.html',
  styleUrls: ['./user-graph-diet.component.css']
})

export class UserGraphDietComponent  {

  data: any;
  domain: any;
  dims: any;
  margin = [0, 0, 0, 0];
  legendOptions: any;
  view: any[] = [800, 450];
  showLegend = true;

  colorScheme = "fire"

  showLabels = true;
  explodeSlices = true;
  doughnut = false;
  itemRef
  logItemsList
  tooltipDisabled=true

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

     // this.totalData = this.dataInterpretorService.getUserLogTimesByType('Diet')
      this.data = this.dataInterpretorService.getUserLogInstancesByType('Diet/Exercise') 
      console.log('appetiteData data')
      console.log(this.data)
    }
  
  onSelect(event) {
    console.log(event);
  }
}
