import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OptionInterface } from '@core/interfaces';
import { ContentService, ContentUpdateService, DialogService, ProgressService } from '@core/services';
import { TableValueType } from '@core/types';
import { Content, ContentHeaders, ContentUniqueTableValue } from '@feature/cms/models';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
        this.dataSource.set(
          new MatTableDataSource(
            res as Content.Base[]
          )
        );
        this.rawData.set(res);
        this.isLoading.set(false);
        this.dataSource().paginator = this.paginator() as MatPaginator;
      });
  }
}
