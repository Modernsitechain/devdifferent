import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IconComponent,
  IconName,
} from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input()
  public icon ?: IconName;

  @Input()
  public iconPosition: 'left' | 'right' = 'left';

  @Input()
  public iconOnly = false;

  @Input()
  public underline = false;

  @Input()
  public spinning = false;

  @Input()
  public loading = false;

  @Input()
  @HostBinding('style.gap.rem')
  public gap = 0.25;

}
