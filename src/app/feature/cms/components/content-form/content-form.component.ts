import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [],
  templateUrl: './content-form.component.html',
  styleUrl: './content-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentFormComponent {

}
