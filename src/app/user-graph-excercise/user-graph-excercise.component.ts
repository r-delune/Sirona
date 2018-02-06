import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import { BrowserModule} from '@angular/platform-browser';
import { single, multi, data, data2} from '../data';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { DataInterpretorService }  from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-excercise',
  templateUrl: './user-graph-excercise.component.html',
  styleUrls: ['./user-graph-excercise.component.css']
})
export class UserGraphExcerciseComponent {

  logItems
  currentUserLogItems
 
  single: any[];
  multi: any[];

  data1: any[];
  data2: any[];

  excerciseData1: any[];
  excerciseData2: any[];

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
  
  totalExerciseData
  totalData
  //data1
  energyLevelData

  
  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 
      this.totalData = this.dataInterpretorService.getUserLogTimesByType('Exercise')
      this.data1 = this.totalData.data1
      console.log('this.excerciseData')
      console.log(this.data1)

      //CHANGE: DATA1 TO SINGLE ARRAY
    }
  
  onSelect(event) {
    console.log(event);
  }
}
