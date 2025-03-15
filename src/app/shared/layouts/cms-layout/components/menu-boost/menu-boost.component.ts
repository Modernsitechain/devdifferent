import { Component } from '@angular/core';
import { ButtonDirective } from '@app/shared/directives';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  saxHome2Outline,
  saxMessageAddOutline,
  saxVideoVerticalOutline,
  saxVideoTickOutline,
  saxBookOutline,
  saxAwardOutline,
  saxCodeOutline,
  saxLovelyOutline,
  saxVideoPlayOutline,
  saxUserCirlceAddOutline
} from '@ng-icons/iconsax/outline';

interface MenuInterface {
  icon: string;
  text: string;
  url: string;
}

@Component({
  selector: 'app-menu-boost',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    TranslateModule,
    NgIconComponent
  ],
  templateUrl: './menu-boost.component.html',
  styleUrl: './menu-boost.component.scss',
  viewProviders: [
    provideIcons({
      saxHome2Outline,
      saxMessageAddOutline,
      saxVideoVerticalOutline,
      saxVideoTickOutline,
      saxBookOutline,
      saxAwardOutline,
      saxCodeOutline,
      saxLovelyOutline,
      saxVideoPlayOutline,
      saxUserCirlceAddOutline
    })
  ]
})
export class MenuBoostComponent {
  public menus: MenuInterface[] = [
    {
      icon: 'saxMessageAddOutline',
      text: 'menu-boost.positive-message',
      url: '/content-management/positive-messages'
    },
    {
      icon: 'saxVideoVerticalOutline',
      text: 'menu-boost.hack',
      url: '/content-management/hacks'
    },
    {
      icon: 'saxVideoTickOutline',
      text: 'menu-boost.insight',
      url: '/content-management/insights'
    },
    {
      icon: 'saxBookOutline',
      text: 'menu-boost.challenge',
      url: '/content-management/challenges'
    },
    {
      icon: 'saxAwardOutline',
      text: 'menu-boost.milestone',
      url: '/content-management/milestones'
    }
  ];

  constructor(
    public route: Router,
  ) {
  }

  public isActive(route: string) {
    if (this.route.url.includes(route)) {
      return true;
    }

    return false;
  }
}
