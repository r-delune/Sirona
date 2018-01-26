import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { NouisliderModule } from 'ng2-nouislider';
import { FormsModule, FormControlDirective } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app-component/app.component';
import { LogItemComponent } from './log-item/log-item.component';
import { LogItemListComponent } from './log-item-list/log-item-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FavoriteDirective } from './favorite.directive';
import { CategoryListPipe } from './category-list.pipe';
import { LogItemTableComponent } from './log-item-table/log-item-table.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import { DatastoreService } from './services/datastore.service';
import { AuthService } from './services/auth.service';
import { lookupListToken, lookupLists } from './providers';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './environments/environment';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
    AngularFireDatabaseModule,
    NouisliderModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LogItemComponent,
    LogItemListComponent,
    FavoriteDirective,
    CategoryListPipe,
    LogItemFormComponent,
    LogItemTableComponent,
    LoginFormComponent,
    UserHomeComponent,
    UserGraphComponent,
    UserProfileComponent
  ],
  providers: [
    DatastoreService,
    AuthService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: XHRBackend, useClass: XHRBackend },
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [
    AppComponent
  ],
  
})

export class AppModule {}