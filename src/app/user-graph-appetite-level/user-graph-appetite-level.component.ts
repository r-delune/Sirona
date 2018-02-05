import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-appetite-level',
  templateUrl: './user-graph-appetite-level.component.html',
  styleUrls: ['./user-graph-appetite-level.component.css']
})
export class UserGraphAppetiteLevelComponent {
  appetiteLevelData

  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.appetiteLevelData = this.dataInterpretorService.getAppetiteTrend()
    console.log('sleepQualityData')
    console.log(this.appetiteLevelData)
  }
}
