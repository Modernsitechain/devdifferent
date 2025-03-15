import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@app/shared/layouts/cms-layout/components';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MenuBoostComponent } from './components/menu-boost/menu-boost.component';

@Component({
  selector: 'app-cms-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
    MenuBoostComponent
  ],
  templateUrl: './cms-layout.component.html',
  styleUrl: './cms-layout.component.scss',
})
export class CmsLayoutComponent {
}
