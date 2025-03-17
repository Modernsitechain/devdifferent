import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorMessageComponent {
  public readonly showMessage = input.required<boolean>();
  public readonly message = input.required<string>();
}
