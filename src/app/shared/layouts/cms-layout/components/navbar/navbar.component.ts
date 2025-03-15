import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input()
  @HostBinding('class.shadow')
  public shadow = false;

  constructor(private router: Router) {}

  public goHome(): void {
    // TODO: Change this navigate router to actual path
    void this.router.navigate(['/']);
  }
}
