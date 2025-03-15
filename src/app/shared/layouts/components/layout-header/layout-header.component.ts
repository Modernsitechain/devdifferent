import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent {

}
