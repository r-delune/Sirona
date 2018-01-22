import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';


import { AppComponent } from './app.component';
import { LogItemComponent } from './log-item.component';
import { LogItemListComponent } from './log-item-list.component';
import { FavoriteDirective } from './favorite.directive';
import { CategoryListPipe } from './category-list.pipe';
import { LogItemTableComponent } from './log-item-table.component';
import { LogItemFormComponent } from './log-item-form.component';
import { LogItemService } from './log-item.service';
import { lookupListToken, lookupLists } from './providers';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { environment } from '../environments/environment';
import { ListTaskComponent } from './list-task/list-task.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAr7JyYnwIGJGbu4PR8l1KTNon9FMoVmdI",
  authDomain: "sirona-7d26e.firebaseapp.com",
  databaseURL: "https://sirona-7d26e.firebaseio.com",
  projectId: "sirona-7d26e",
  storageBucket: "",
  messagingSenderId: "752822378676"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    LogItemComponent,
    LogItemListComponent,
    FavoriteDirective,
    CategoryListPipe,
    LogItemFormComponent,
    LogItemTableComponent,
    ListTaskComponent
  ],
  providers: [
    LogItemService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: XHRBackend, useClass: XHRBackend },
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [
    AppComponent
  ],
  
})

export class AppModule {}