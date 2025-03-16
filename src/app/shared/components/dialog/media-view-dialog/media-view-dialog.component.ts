import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { LabelComponent } from '@shared/components/label/label.component';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-media-view-dialog',
  standalone: true,
  imports: [
    ButtonDirective,
    TranslateModule,
    DialogComponent,
    ButtonDirective,
    LabelComponent,
  ],
  templateUrl: './media-view-dialog.component.html',
  styleUrl: './media-view-dialog.component.scss'
})
export class MediaViewDialogComponent {
  constructor(
    @Inject(DIALOG_DATA)
    public data: {
      media: string | ArrayBuffer | null;
      mediaType: 'image';
    },
    private dialogRef: DialogRef<boolean, MediaViewDialogComponent>,
  ) {}

  public close() {
    this.dialogRef.close();
  }
}
