import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { DatastoreService } from '../services/datastore.service';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../data';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DataInterpretorService} from '../services/data-interpretor.service'

@Component({
  selector: 'app-user-graph-energy-level',
  templateUrl: './user-graph-energy-level.component.html',
  styleUrls: ['./user-graph-energy-level.component.css']
})
export class UserGraphEnergyLevelComponent {

  energyLevelData

  constructor(private datastoreService: DatastoreService,
    private dataInterpretorService: DataInterpretorService) { 

    this.energyLevelData = this.dataInterpretorService.getEnergyLevelTrend()
    console.log('sleepQualityData')
    console.log(this.energyLevelData)
  }
}
