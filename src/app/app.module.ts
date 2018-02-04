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
import { LoginFormComponent } from './login-form/login-form.component';
import { FavoriteDirective } from './favorite.directive';
import { CategoryListPipe } from './category-list.pipe';
import { LogItemTableComponent } from './log-item-table/log-item-table.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import { DatastoreService } from './services/datastore.service';
import { AuthService } from './services/auth.service';
import { AuthGuard  } from './services/auth-gaurd.service';
import { lookupListToken, lookupLists } from './providers';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NgxChartsModule} from '@swimlane/ngx-charts'
import { environment } from './environments/environment';
import { UserGraphExcerciseComponent } from './user-graph-excercise/user-graph-excercise.component';
import { UserGraphMoodComponent } from './user-graph-mood/user-graph-mood.component';
import { UserGraphDietComponent } from './user-graph-diet/user-graph-diet.component';
import { TreeModule } from 'ng2-tree';
import { UserGraphOverviewComponent } from './user-graph-overview/user-graph-overview.component';
import { UserGraphAnalysisComponent } from './user-graph-analysis/user-graph-analysis.component';
import { LogMoodItemFormComponent } from './log-mood-item-form/log-mood-item-form.component';
import { LogSleepItemFormComponent } from './log-sleep-item-form/log-sleep-item-form.component';
import { LogDietItemFormComponent } from './log-diet-item-form/log-diet-item-form.component';
import { LogExcerciseItemFormComponent } from './log-excercise-item-form/log-excercise-item-form.component';
import { UserGraphSleepComponent } from './user-graph-sleep/user-graph-sleep.component';
import { DataInterpretorService } from './services/data-interpretor.service';

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
    NgxChartsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NouisliderModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    TreeModule
  ],
  declarations: [
    AppComponent,
    FavoriteDirective,
    CategoryListPipe,
    LogItemFormComponent,
    LogItemTableComponent,
    LoginFormComponent,
    UserHomeComponent,
    UserGraphComponent,
    UserProfileComponent,
    RegistrationFormComponent,
    UserGraphExcerciseComponent,
    UserGraphMoodComponent,
    UserGraphDietComponent,
    UserGraphOverviewComponent,
    UserGraphAnalysisComponent,
    LogMoodItemFormComponent,
    LogSleepItemFormComponent,
    LogDietItemFormComponent,
    LogExcerciseItemFormComponent,
    UserGraphSleepComponent
  ],
  providers: [
    DatastoreService,
    AuthService,
    AuthGuard,
    DataInterpretorService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: XHRBackend, useClass: XHRBackend },
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [
    AppComponent
  ]
  
})

export class AppModule {}