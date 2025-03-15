import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMS_ROUTES } from '@feature/cms/cms.routes';
import { CmsLayoutComponent } from '@shared/layouts';

const routes: Routes = [
  {
    path: 'cms',
    component: CmsLayoutComponent,
    loadChildren: () => CMS_ROUTES
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cms'
  },
  {
    path: '**',
    redirectTo: 'cms'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
