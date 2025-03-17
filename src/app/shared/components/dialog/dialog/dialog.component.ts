import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input()
  @HostBinding('class.full-border-radius')
  public fullBorderRadius = false;

  @Input()
  public disableClose?: boolean;

  @Output()
  public closeClicked = new EventEmitter<void>();

  public close(): void {
    this.closeClicked.emit();
  }
}
