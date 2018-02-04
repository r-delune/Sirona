import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import { LogItemTableComponent } from './log-item-table/log-item-table.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { AuthGuard } from './authGuard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserGraphExcerciseComponent } from './user-graph-excercise/user-graph-excercise.component';
import { UserGraphMoodComponent } from './user-graph-mood/user-graph-mood.component';
import { UserGraphDietComponent } from './user-graph-diet/user-graph-diet.component';
import { UserGraphAnalysisComponent } from './user-graph-analysis/user-graph-analysis.component';
import { UserGraphOverviewComponent } from './user-graph-overview/user-graph-overview.component';
import { LogMoodItemFormComponent } from './log-mood-item-form/log-mood-item-form.component';
import { LogSleepItemFormComponent } from './log-sleep-item-form/log-sleep-item-form.component';
import { LogDietItemFormComponent } from './log-diet-item-form/log-diet-item-form.component';
import { LogExcerciseItemFormComponent } from './log-excercise-item-form/log-excercise-item-form.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent, data: { animation: 'tiger' } },
  { path: 'add', component: LogItemFormComponent, data: { animation: 'dolphin'} },
  { path: 'table', component: LogItemTableComponent, data: { animation: 'dolphin'}},
  { path: 'register', component: RegistrationFormComponent, data: { animation: 'dolphin'}},
  { path: 'profile', component: UserProfileComponent, data: { animation: 'dolphin'}},
  { path: 'graph', component: UserGraphComponent },
  //{ path: ':medium', component: LogItemListComponent, data: { animation: 'dolphin'}},
  { path: 'home', component: UserHomeComponent, data: { animation: 'dolphin'},canActivate: [AuthGuard]},
  { path: 'exerciseForm', component: LogExcerciseItemFormComponent, data: { animation: 'dolphin'}},
  { path: 'dietForm', component: LogDietItemFormComponent , data: { animation: 'dolphin'}},
  { path: 'sleepForm', component: LogSleepItemFormComponent},
  { path: 'moodForm', component: LogMoodItemFormComponent},
  {
    path: 'graph',
    component: UserGraphComponent,
    children: [
      {path: '', redirectTo: 'graph/overview',pathMatch: 'full'},
      {path: 'excerciseGraph', component: UserGraphExcerciseComponent, data: { animation: 'dolphin' }},
      {path: 'moodGraph', component: UserGraphMoodComponent, data: { animation: 'dolphin' }},
      {path: 'dietGraph', component: UserGraphDietComponent, data: { animation: 'dolphin' }},
      {path: 'overview', component: UserGraphOverviewComponent, data: { animation: 'dolphin' }},
      {path: 'analysisGraph', component: UserGraphAnalysisComponent, data: { animation: 'dolphin' }}, 
      {path: 'sleepGraph', component: LogSleepItemFormComponent, data: { animation: 'dolphin' }},   
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(appRoutes);