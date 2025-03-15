import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

import { TranslateModule } from '@ngx-translate/core';
import { ProgressService } from '@app/core/services/progress/progress.service';

@Component({
  selector: 'app-progress-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    ProgressBarComponent,
    FontAwesomeModule,
    TranslateModule,
  ],
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressDialogComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public data: {
      title: string;
      desc: string;
    },
    private dialogRef: DialogRef<boolean, ProgressDialogComponent>,
    private progressService: ProgressService
  ) {}

  public getProgress() {
    return this.progressService.getProgress();
  }

  public getMessage() {
    return this.progressService.getMessage();
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
