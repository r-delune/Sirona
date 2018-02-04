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

  data: any[];
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
  data1

  constructor(authService: AuthService,
    private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

      this.currentUserLogItems = datastoreService.allUserItems
      console.log('GRAPH - get usrr items')
      console.log(this.currentUserLogItems)
      console.log(single)
      console.log(multi)
      console.log(data)
      console.log(data2)
      this.totalData = this.dataInterpretorService.getUserLogTimesByType('Exercise')
      this.data1 = this.totalData.data1
      this.data2 = this.totalData.data2
      console.log('this.excerciseData')
      console.log(this.excerciseData1)
      console.log(this.excerciseData2)

      //Object.assign(this, {data, data2})   
    }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(){

  }
}
