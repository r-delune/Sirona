import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';


import { AppComponent } from './app.component';
import { MoodItemComponent } from './mood-item.component';
import { MoodItemListComponent } from './mood-item-list.component';
import { FavoriteDirective } from './favorite.directive';
import { CategoryListPipe } from './category-list.pipe';
import { MoodItemLogComponent } from './mood-item-log.component';
import { MoodItemFormComponent } from './mood-item-form.component';
import { MoodItemService } from './mood-item.service';
import { lookupListToken, lookupLists } from './providers';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

export const firebaseConfig = {
  apiKey: "AIzaSyDIA02kcimwJRaruUPR2Qe8Ro6m1aLYj_g",
  authDomain: "luminous-bazaar-191816.firebaseapp.com",
  databaseURL: "https://luminous-bazaar-191816.firebaseio.com",
  projectId: "luminous-bazaar-191816",
  storageBucket: "luminous-bazaar-191816.appspot.com",
  messagingSenderId: "495548272715"
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    MoodItemComponent,
    MoodItemListComponent,
    FavoriteDirective,
    CategoryListPipe,
    MoodItemFormComponent,
    MoodItemLogComponent
  ],
  providers: [
    MoodItemService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: XHRBackend, useClass: XHRBackend },
    //Enter app at this point - home
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [
    AppComponent
  ],
  
})
export class AppModule {}