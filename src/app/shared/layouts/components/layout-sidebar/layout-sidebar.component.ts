import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidebarComponent {

}
