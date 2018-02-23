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
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppComponent } from './app-component/app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FavoriteDirective } from './favorite.directive';
import { CategoryListPipe } from './category-list.pipe';
import { DatastoreService } from './services/datastore.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService  } from './services/auth-gaurd.service';
import { DataInterpretorService } from './services/data-interpretor.service';
import { lookupListToken, lookupLists } from './providers';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NgxChartsModule} from '@swimlane/ngx-charts'
import { environment } from './environments/environment';
import { TreeModule } from 'ng2-tree';
import { LogMoodItemFormComponent } from './log-mood-item-form/log-mood-item-form.component';
import { LogSleepItemFormComponent } from './log-sleep-item-form/log-sleep-item-form.component';
import { LogDietItemFormComponent } from './log-diet-item-form/log-diet-item-form.component';
import { UserGraphSleepQualityComponent } from './user-graph-sleep-quality/user-graph-sleep-quality.component';
import { UserGraphGeneralMoodComponent } from './user-graph-general-mood/user-graph-general-mood.component';
import { UserGraphAppetiteLevelComponent } from './user-graph-appetite-level/user-graph-appetite-level.component';
import { UserGraphMoodComponent } from './user-graph-mood/user-graph-mood.component';
import { UserGraphDietComponent } from './user-graph-diet/user-graph-diet.component';
import { UserGraphOverviewComponent } from './user-graph-overview/user-graph-overview.component';
import { UserGraphAnalysisComponent } from './user-graph-analysis/user-graph-analysis.component';
import { UserGraphSleepComponent } from './user-graph-sleep/user-graph-sleep.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import { MatSliderModule} from '@angular/material/slider';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import {
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSlideToggleModule
} from '@angular/material';

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
    IonRangeSliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NouisliderModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    TreeModule,
    HttpClientModule,
    MatSliderModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatExpansionModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    FavoriteDirective,
    CategoryListPipe,
    LoginFormComponent,
    UserGraphComponent,
    UserProfileComponent,
    RegistrationFormComponent,
    UserGraphMoodComponent,
    UserGraphDietComponent,
    UserGraphOverviewComponent,
    UserGraphAnalysisComponent,
    LogMoodItemFormComponent,
    LogSleepItemFormComponent,
    LogItemFormComponent,
    LogDietItemFormComponent,
    UserGraphSleepComponent,
    UserGraphSleepQualityComponent,
    UserGraphGeneralMoodComponent,
    UserGraphAppetiteLevelComponent
  ],
  providers: [
    DatastoreService,
    AuthService,
    AuthGuardService,
    DataInterpretorService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [
    AppComponent
  ]
  
})

export class AppModule {}