import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import { LogItemListComponent } from './log-item-list/log-item-list.component';
import { LogItemTableComponent } from './log-item-table/log-item-table.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { AuthGuard } from './authGuard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent, data: { animation: 'tiger' } },
  { path: 'add', component: LogItemFormComponent, data: { animation: 'dolphin'} },
  { path: 'table', component: LogItemTableComponent, data: { animation: 'dolphin'}},
  { path: 'register', component: RegistrationFormComponent, data: { animation: 'dolphin'}},
  { path: 'profile', component: UserProfileComponent, data: { animation: 'dolphin'}},
  { path: 'graph', component: UserGraphComponent ,data: { animation: 'dolphin'}},
  { path: ':medium', component: LogItemListComponent, data: { animation: 'dolphin'}},
  { path: 'home', component: UserHomeComponent, data: { animation: 'dolphin'},canActivate: [AuthGuard]},
  //{
 //   path: 'full',
  //  component: UserHomeComponent,
  //  canActivate: [AuthGuard], 
  //  children: [
  //    {path: '', redirectTo: 'full'},
  //    {path: 'table', component: LogItemTableComponent, data: { animation: 'tiger' }},
  //    {path: 'add', component: LogItemFormComponent, data: { animation: 'dolphin' }},
  //  ]
  //},
  { path: '', pathMatch: 'full', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(appRoutes);