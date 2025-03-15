import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from '@app/shared/directives';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent, IconName } from '@shared/components/icon/icon.component';

interface MenuInterface {
  icon: IconName;
  label: string;
  url: string;
}

@Component({
  selector: 'app-layout-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonDirective, TranslateModule, IconComponent],
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSidebarComponent {
  public menus: MenuInterface[] = [
    {
      icon: 'saxImageOutline',
      label: 'menu.content',
      url: '/cms/content',
    }
  ];

  constructor(public route: Router) {}

  public isActive(route: string) {
    if (this.route.url.includes(route)) {
      return true;
    }

    return false;
  }
}
