import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutHeaderComponent } from '../components/layout-header/layout-header.component';
import { LayoutSidebarComponent } from '../components/layout-sidebar/layout-sidebar.component';

@Component({
  selector: 'app-cms-layout',
  standalone: true,
  imports: [
    RouterModule,
    LayoutHeaderComponent,
    LayoutSidebarComponent,
  ],
  templateUrl: './cms-layout.component.html',
  styleUrl: './cms-layout.component.scss',
})
export class CmsLayoutComponent {
}
