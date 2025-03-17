import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Inject,
  OnInit,
  Output
} from '@angular/core';
import { Observable, map, takeWhile, timer } from 'rxjs';
import { PopupDialogData } from '../dialog.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { LabelComponent } from '@app/shared/components';
import { SanitizePipe } from '@app/shared/pipes';
import { ButtonDirective } from '@app/shared/directives';

@Component({
  selector: 'app-popup-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    LabelComponent,
    SanitizePipe,
    ButtonDirective
  ],
  templateUrl: './popup-dialog.component.html',
  styleUrl: './popup-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDialogComponent implements OnInit {
  public countdown$?: Observable<number>;

  constructor(
    private dialogRef: DialogRef<boolean, PopupDialogComponent>,
    private destroyRef: DestroyRef,
    @Inject(DIALOG_DATA) public data: PopupDialogData,
  ) {}

  public ngOnInit(): void {
    this.initialize();
  }

  @Output()
  public primarySubmit = new EventEmitter<void>();

  public click(){
    this.primarySubmit.emit();
  }


  public delete_data(){
    this.dialogRef.close(true);
  }

  public close(confirm = false): void {
    this.dialogRef.close(confirm);
  }

  private initialize(): void {
    if (this.data.time) {
      const time = this.data.time;

      this.countdown$ = timer(0, 1000).pipe(
        map((n) => (time - n) * 1000),
        takeWhile((n) => n >= 0)
      );

      this.countdown$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result / 1000 <= 0) {
            this.dialogRef.close(true);
            if (this.data.afterClosed) {
              this.data.afterClosed();
            }
          }
        });
    }
  }
}
