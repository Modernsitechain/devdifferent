import { DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OptionInterface } from '@core/interfaces';
import {
  ContentService,
  ContentUpdateService,
  DialogService,
  ProgressService,
} from '@core/services';
import { TableValueType } from '@core/types';
import {
  Content,
  ContentHeaders,
  ContentUniqueTableValue,
} from '@feature/cms/models';
import { ProgressDialogComponent } from '@shared/components';
import { PopupDialogComponent } from '@shared/components/dialog/popup-dialog/popup-dialog.component';
import { TableComponent } from '@shared/components/table';
import { catchError, concatMap, of, timer } from 'rxjs';
import { ContentDialogDetailComponent } from '../content-dialog-detail/content-dialog-detail.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [MatPaginator, TableComponent],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentListComponent {
  private readonly router = inject(Router);
  private readonly contentService = inject(ContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogService = inject(DialogService);
  private readonly progressService = inject(ProgressService);
  private readonly contentUpdateService = inject(ContentUpdateService);

  public dataSource = signal<MatTableDataSource<Content.Table>>(
    new MatTableDataSource()
  );
  public readonly headers = ContentHeaders;
  public readonly uniqueTableValue = ContentUniqueTableValue;
  protected modelSelectedData = signal<any[]>([]);
  private dialogRef: DialogRef<unknown, unknown> | undefined;

  private paginator = viewChild<MatPaginator>(MatPaginator);

  public isLoading = signal<boolean>(true);
  protected modelSearchKey = signal<string>('');
  public rawData = signal<Content.Base[]>([]);

  protected selectedData = effect(() => {
    return this.modelSelectedData().map((data) => data.id);
  });

  constructor() {
    effect(() => {
      this.dataSource().filter = this.modelSearchKey().trim().toLowerCase();

      if (this.dataSource().paginator) {
        this.dataSource().paginator?.firstPage;
      }
    });
  }

  public ngOnInit(): void {
    this.loadList();
  }

  public addContent(): void {
    this.router.navigate(['cms/content/create']);
  }

  protected search(value: string | undefined): void {
    this.modelSearchKey.set(value ?? '');
  }

  protected openViewDetailDialog(data: Content.Base): void {
    // this.dialogService.open(ContentDialogDetailComponent, data, false, true);
  }

  protected deleteContent(data: Content.Base): void {
    this.dialogService
      .open(
        PopupDialogComponent,
        {
          title: 'Delete Content',
          primaryLabel: 'confirm',
          secondaryLabel: 'cancel',
        },
        false,
        true
      )
      .pipe(
        concatMap((res) => {
          if (res) {
            this.openProgressDialog();
            const growth = this.rawData().find(
              (_data) => _data._id === data._id
            );
            if (growth) {
              return this.contentService.deleteContent(growth);
            }
          }
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          if (res.length !== 0) {
            this.progressService.setProgress(100, 'data deleted!');
            timer(1000).subscribe(() => {
              this.dialogRef?.close();
            });
            this.loadList();
          }
        },
        error: (error) => {
          this.progressService.setProgress(-1, error.message);
          return of(error);
        },
      });
  }

  protected downloadContent(data: Content.Base): void {
    this.contentService.downloadImage(data.image as string).subscribe({
      next: (res) => {
        const blob = res.body as Blob;
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = res.path;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.warn('err', err);
      },
    });
  }

  private openProgressDialog() {
    this.dialogRef = this.dialogService.openWithCompRef(
      ProgressDialogComponent,
      {
        title: 'Delete Content',
      },
      true,
      true
    );
  }

  private loadList(): void {
    this.isLoading.set(true);
    this.contentService
      .getList()
      .pipe(
        catchError((err) => {
          console.warn('content list err =>', err);
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.dataSource.set(new MatTableDataSource(res as Content.Table[]));
        this.rawData.set(res);
        this.isLoading.set(false);
        this.dataSource().paginator = this.paginator() as MatPaginator;
      });
  }
}
