import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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
