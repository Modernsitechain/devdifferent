import { Routes } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';
import { CONTENT_ROUTES } from './content.routes';

export const CMS_ROUTES: Routes = [
  {
    path: 'content',
    component: ContentComponent,
    loadChildren: () => CONTENT_ROUTES
  },
  { path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '**', redirectTo: 'content' }
];
