import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentListComponent {

}
