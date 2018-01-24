import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogItemFormComponent } from './log-item-form/log-item-form.component';
import { LogItemListComponent } from './log-item-list/log-item-list.component';
import { LogItemTableComponent } from './log-item-table/log-item-table.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AuthGuard } from './authGuard.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent, data: { animation: 'tiger' } },
  { path: 'add', component: LogItemFormComponent, data: { animation: 'dolphin'} },
  { path: 'table', component: LogItemTableComponent },
  { path: 'home', component: LogItemTableComponent },
  { path: ':medium', component: LogItemListComponent },
  //{
 //   path: 'full',
  //  component: UserHomeComponent,
  //  canActivate: [AuthGuard], 
  //  children: [
  ///    {path: '', redirectTo: 'full'},
  //    {path: 'table', component: LogItemTableComponent, data: { animation: 'tiger' }},
  //    {path: 'add', component: LogItemFormComponent, data: { animation: 'dolphin' }},
  //  ]
  //},
  { path: '', pathMatch: 'full', redirectTo: 'table' }
];

export const routing = RouterModule.forRoot(appRoutes);
