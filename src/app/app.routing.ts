import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { AuthGuardService } from './services/auth-gaurd.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserGraphMoodComponent } from './user-graph-mood/user-graph-mood.component';
import { UserGraphDietComponent } from './user-graph-diet/user-graph-diet.component';
import { UserGraphAnalysisComponent } from './user-graph-analysis/user-graph-analysis.component';
import { UserGraphOverviewComponent } from './user-graph-overview/user-graph-overview.component';
import { LogMoodItemFormComponent } from './log-mood-item-form/log-mood-item-form.component';
import { LogSleepItemFormComponent } from './log-sleep-item-form/log-sleep-item-form.component';
import { LogDietItemFormComponent } from './log-diet-item-form/log-diet-item-form.component';
import { UserGraphSleepComponent } from './user-graph-sleep/user-graph-sleep.component';
import { UserGraphSleepQualityComponent } from './user-graph-sleep-quality/user-graph-sleep-quality.component';
import { UserGraphGeneralMoodComponent } from './user-graph-general-mood/user-graph-general-mood.component';
import { UserGraphAppetiteLevelComponent } from './user-graph-appetite-level/user-graph-appetite-level.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import {MatSliderModule} from '@angular/material/slider';
const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent, data: { animation: 'loginRoute' } },
  { path: 'register', component: RegistrationFormComponent, data: { animation: 'registerRoute'}},
  { path: 'profile', component: UserProfileComponent,data: { animation: 'profileRoute'}},
  { path: 'add', component: LogItemFormComponent, data: { animation: 'addRoute'}},
  //{ path: ':medium', component: LogItemListComponent, data: { animation: 'dolphin'}},
  { path: 'dietForm', component: LogDietItemFormComponent,data: { animation: 'dietRoute'}},
  { path: 'sleepForm', component: LogSleepItemFormComponent, data: { animation: 'sleepRoute'}},
  { path: 'moodForm', component: LogMoodItemFormComponent, data: { animation: 'moodRoute'}},
  {
    path: 'graph',
    component: UserGraphComponent,
    children: [
      {path: '', redirectTo: 'graph/overview',pathMatch: 'full'},
      {path: 'moodGraph', component: UserGraphMoodComponent, data: { animation: 'moodGraphRoute' }},
      {path: 'dietGraph', component: UserGraphDietComponent, data: { animation: 'dietGraphRoute' }},
      {path: 'overview', component: UserGraphOverviewComponent, data: { animation: 'overviewGraphRoute' }},
      {path: 'analysisGraph', component: UserGraphAnalysisComponent, data: { animation: 'analyisGraphRoute' }}, 
      {path: 'sleepGraph', component: UserGraphSleepComponent, data: { animation: 'sleepGraphRoute' }},   
      {path: 'sleepQualityGraph', component: UserGraphSleepQualityComponent, data: { animation: 'sleepQualityGraphRoute' }},
      {path: 'generalMoodGraph', component: UserGraphGeneralMoodComponent, data: { animation: 'generalMoodGraphRoute' }}, 
      {path: 'appetiteLevelGraph', component: UserGraphAppetiteLevelComponent, data: { animation: 'appetiteGraphRoute' }}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);