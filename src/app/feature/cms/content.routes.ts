import { Routes } from '@angular/router';
import { ContentListComponent } from './components/content-list/content-list.component';
import { ContentFormComponent } from './components/content-form/content-form.component';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    component: ContentListComponent,
  },
  {
    path: 'create',
    component: ContentFormComponent,
  },
  {
    path: 'update/:id',
    component: ContentFormComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
