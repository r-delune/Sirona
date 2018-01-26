import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})
export class UserGraphComponent implements OnInit {
  logItems = []

  constructor(  authService: AuthService) { }

  ngOnInit() {
  }

}
