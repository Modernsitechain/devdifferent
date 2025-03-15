import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MediaInterface } from '@interfaces';
import { MediaService } from '@services';
import { DialogComponent } from '../dialog/dialog.component';
import { Perform } from '@classes';
import { ButtonDirective } from '@directives';
import { TranslateModule } from '@ngx-translate/core';
import { LabelComponent } from '../../label';

@Component({
  selector: 'app-media-view-dialog',
  standalone: true,
  imports: [
    TranslateModule,
    DialogComponent,
    ButtonDirective,
    LabelComponent,
    CommonModule
  ],
  templateUrl: './media-view-dialog.component.html',
  styleUrl: './media-view-dialog.component.scss'
})
export class MediaViewDialogComponent {
  public mediaPerform = new Perform<string>();

  constructor(
    @Inject(DIALOG_DATA)
    public data: {
      media: string | ArrayBuffer | null;
      mediaType: 'video' | 'image' | 'audio';
    },
    private dialogRef: DialogRef<boolean, MediaViewDialogComponent>,
    private mediaService: MediaService
  ) {}

  private loadMedia(path: string) {
    this.mediaPerform.load(this.mediaService.getMediaUrl(path));
  }

  public close() {
    this.dialogRef.close();
  }
}
