import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, take, timer } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import {
  FormComponent,
  FormFieldComponent,
  InputComponent,
  FileInputComponent,
  LabelComponent,
  ProgressDialogComponent,
} from '@shared/components';
import { ButtonDirective } from '@shared/directives';
import { FormBase } from '@core/classes';
import {
  ContentUpdateService,
  DialogService,
  ProgressService,
  ContentService,
} from '@core/services';
import { DialogRef } from '@angular/cdk/dialog';
import { MediaInterface } from '@core/interfaces';
import { Validators } from '@shared/validators/validator.class';
import { Content } from '@feature/cms/models';
import { AwsS3Service } from '@core/services/aws-s3/aws-s3.service';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [
    ButtonDirective,
    TranslateModule,
    FormComponent,
    FormFieldComponent,
    InputComponent,
    FileInputComponent,
    LabelComponent,
  ],
  templateUrl: './content-form.component.html',
  styleUrl: './content-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentFormComponent extends FormBase<any, any> {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly contentService = inject(ContentService);
  private readonly progressService = inject(ProgressService);
  private readonly contentUpdateService = inject(ContentUpdateService);
  private readonly awsS3Service = inject(AwsS3Service);
  public override form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    image: new FormControl<MediaInterface | null>(null),
  });

  private dialogRef: DialogRef<unknown, unknown> | undefined;

  public droppedImage = signal<MediaInterface | null>(null);
  public currentImage = signal<MediaInterface | undefined>(undefined);

  public updateState = computed(() =>
    this.activatedRoute.snapshot.paramMap.get('id')
  );
  public currentContent = this.contentUpdateService.getCurrentContent();

  constructor() {
    super();
    if (this.updateState()) this.getCurrentData();
  }

  public ngOnInit(): void {
    if (!this.updateState()) {
      this.currentImage.set(undefined);
    }
  }

  protected updateContent() {
    this.openProgressDialog();
    if (this.currentContent) {
      const payload: Content.FormContentUpdate = {
        _id: '',
        title: this.form.controls.title.value!,
        image: this.form.controls.image.value!,
      };

      return this.contentService
        .updateContent(payload)
        .pipe(
          map(() => {
            this.progressService.setProgress(100, 'Success Update');
            this.resetAndExit();
          }),
          catchError((error) => {
            this.progressService.setProgress(-1, error.message);
            return of(error);
          })
        )
        .subscribe();
    }

    return of();
  }

  protected override onSubmit(
    _formValue: Content.FormContentCreate
  ): Observable<unknown> {
    this.openProgressDialog();

    return this.contentService.createContent(_formValue).pipe(
      map(() => {
        this.resetAndExit();
      }),
      catchError((error) => {
        this.progressService.setProgress(-1, error.message);
        return of(error);
      })
    );
  }

  // FORM

  private resetAndExit(): void {
    timer(2000)
      .pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        this.dialogRef?.close();
        this.redirectTolist();
      });
  }

  protected redirectTolist() {
    this.router.navigate(['cms/content']);
  }

  private openProgressDialog() {
    this.dialogRef = this.dialogService.openWithCompRef(
      ProgressDialogComponent,
      {
        title: 'uploading content',
        desc: 'uploading content desc',
      },
      true,
      true
    );
  }

  private getCurrentData(): void {
    if (!this.currentContent) {
      this.router.navigate(['cms/content']);
    } else {
      this.form.controls.title.setValue(this.currentContent.title);

      this.currentImage.set({
        title: this.currentContent.image.title,
        url: this.currentContent.image.url,
        size: this.currentContent.image.size,
      });
    }
  }
}
