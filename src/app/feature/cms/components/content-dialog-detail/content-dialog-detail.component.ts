import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { DialogComponent, LabelComponent } from '@shared/components';
import { ButtonDirective } from '@shared/directives';
import { Content } from '../../models';
import { Perform } from '@core/classes';
import { ImageComponent } from '@shared/components';
import { MediaService } from '@core/services';

@Component({
  selector: 'app-content-dialog-detail',
  standalone: true,
  imports: [
    ButtonDirective,
    DialogComponent,
    LabelComponent,
    ImageComponent
  ],
  templateUrl: './content-dialog-detail.component.html',
  styleUrl: './content-dialog-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentDialogDetailComponent {
  private readonly dialogRef = inject(
    DialogRef<boolean, ContentDialogDetailComponent>
  );

  constructor(
    @Inject(DIALOG_DATA)
    public data: Content.Table
  ) {}

  public mediaPerform = new Perform<string>();
  public mediaService = inject(MediaService);

  ngOnInit(){
    this.loadData();
  }

  protected close() {
    this.dialogRef.close();
  }

  private loadData() {
    this.mediaPerform.load(this.mediaService.getMediaUrl(this.data.image));
  }
}
