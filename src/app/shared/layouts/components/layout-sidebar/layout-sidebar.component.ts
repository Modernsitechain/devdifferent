import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from '@app/shared/directives';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent, IconName } from '@shared/components/icon/icon.component';

interface MenuInterface {
  icon: IconName;
  text: string;
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
      icon: 'saxMessageAddOutline',
      text: 'menu-boost.positive-message',
      url: '/content-management/positive-messages',
    },
    {
      icon: 'saxVideoVerticalOutline',
      text: 'menu-boost.hack',
      url: '/content-management/hacks',
    },
    {
      icon: 'saxVideoTickOutline',
      text: 'menu-boost.insight',
      url: '/content-management/insights',
    },
    {
      icon: 'saxBookOutline',
      text: 'menu-boost.challenge',
      url: '/content-management/challenges',
    },
    {
      icon: 'saxAwardOutline',
      text: 'menu-boost.milestone',
      url: '/content-management/milestones',
    },
  ];

  constructor(public route: Router) {}

  public isActive(route: string) {
    if (this.route.url.includes(route)) {
      return true;
    }

    return false;
  }
}
