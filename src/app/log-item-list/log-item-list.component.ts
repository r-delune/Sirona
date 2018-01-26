import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from '../services/datastore.service';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireDatabaseProvider, AngularFireObject } from 'angularfire2/database';
import { User } from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';

export interface Item {
  User: string;
  log: string;
}

@Component({
  selector: 'mw-log-item-list',
  templateUrl: './log-item-list.component.html',
  styleUrls: ['./log-item-list.component.css']
})
export class LogItemListComponent {
  medium = '';

  constructor(
    //allow access to media item service so we can add 
    private datastoreService: DatastoreService,  
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    db: AngularFireDatabase) {
    
    }

  ngOnInit() {

  }

  deleteLogItem(r){}
}
