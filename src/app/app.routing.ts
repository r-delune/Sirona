import { Routes, RouterModule } from '@angular/router';

import { MoodItemFormComponent } from './mood-item-form.component';
import { MoodItemListComponent } from './mood-item-list.component';
import { MoodItemLogComponent } from './mood-item-log.component';

const appRoutes: Routes = [
  { path: 'add', component: MoodItemFormComponent },
  { path: 'log', component: MoodItemLogComponent },
  { path: ':medium', component: MoodItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
