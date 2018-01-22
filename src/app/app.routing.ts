import { Routes, RouterModule } from '@angular/router';

import { LogItemFormComponent } from './log-item-form.component';
import { LogItemListComponent } from './log-item-list.component';
import { LogItemTableComponent } from './log-item-table.component';

const appRoutes: Routes = [
  { path: 'add', component: LogItemFormComponent },
  { path: 'table', component: LogItemTableComponent },
  { path: 'home', component: LogItemTableComponent },
  { path: ':medium', component: LogItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
