import { Component, output, input, viewChild, model } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TableValueType } from '@app/core/types';

import { TableActionDataValueComponent } from '@app/shared/components/table/updated/table-action-data-value/table-action-data-value.component';
import { TableNoDataValueComponent } from '@app/shared/components/table/updated/table-no-data-value/table-no-data-value.component';
import { TableDataValueComponent } from '@app/shared/components/table/updated/table-data-value/table-data-value.component';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { OptionInterface } from '@interfaces';
import { MoovdLoading } from 'moovd-components';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TranslateModule,
    MatTableModule,
    MatInputModule,
    TableDataValueComponent,
    TableActionDataValueComponent,
    TableNoDataValueComponent,
    MatSort,
    MatSortModule,
    MoovdLoading
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  private sort = viewChild.required<MatSort>(MatSort);

  public dataSource = input.required<MatTableDataSource<any>>();
  public headers = input.required<OptionInterface[]>();
  public uniqueValues = input.required<OptionInterface<TableValueType>[]>();
  public contentName = input.required<string>();
  public readonly viewDetail = output<any>();
  public readonly update = output<any>();
  public readonly delete = output<any>();

  //no data value requirement
  public noDataButtonAction = output<void>();
  public showAddButton = input<boolean>(false);

  public selectedData = model<any[]>([]);
  public loading = model<boolean>(false);

  constructor() {}

  // ngOnInit() {
  //   this.dataSource().sort = this.sort() as MatSort;
  // }
  
  ngOnChanges(){
    this.dataSource().sort = this.sort() as MatSort;
  }

  public viewContentDetail(data: any) {
    this.viewDetail.emit(data);
  }

  public updateContent(data: any) {
    this.update.emit(data);
  }

  public deleteContent(data: any) {
    this.delete.emit(data);
  }

  public getValueType(columnName: string): TableValueType {
    const { value } = this.uniqueValues().find(
      (value) => value.name === columnName
    ) || { value: 'text' };

    return value;
  }

  public getTableValue(header: string, value: any) {
    return value;
  }

  public getColumns(headers: OptionInterface[]) {
    return headers.map((header) => header.value) as string[];
  }

  public getHeader(column: string) {
    const header = this.headers().find((item) => item.value === column);

    if (header) {
      return header.name;
    }

    return column;
  }

  public getButtonUrl(modelType: string) {
    switch (modelType) {
      case 'positive message': {
        return 'content-management/positive-messages/create';
      }
      case 'hack': {
        return 'content-management/hacks/create';
      }
      case 'insight': {
        return 'content-management/insights/create';
      }
      case 'challenge': {
        return 'content-management/challenges/create';
      }
      case 'milestone': {
        return 'content-management/milestones/create';
      }
      default: {
        return 'content-managemenet';
      }
    }
  }

  public setSelectedData(data: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedData.update((currentData) => [...currentData, data]);
    } else {
      this.selectedData.update((currentData) =>
        currentData.filter((item) => item !== data)
      );
    }
  }

  public noDataButtonActionVoid(): void {
    return this.noDataButtonAction.emit();
  }
}
