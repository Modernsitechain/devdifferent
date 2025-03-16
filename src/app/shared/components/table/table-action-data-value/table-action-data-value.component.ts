import { Component, output } from '@angular/core';
import { MoovdIcon } from 'moovd-components';

@Component({
  selector: 'app-table-action-data-value',
  standalone: true,
  imports: [MoovdIcon],
  templateUrl: './table-action-data-value.component.html',
  styleUrl: './table-action-data-value.component.scss',
})
export class TableActionDataValueComponent {
  public readonly viewDetail = output<void>();

  public readonly update = output<void>();

  public readonly delete = output<void>();

  public viewContentDetail () {
    this.viewDetail.emit();
  }

  public updateContent() {
    this.update.emit();
  }

  public deleteContent() {
    this.delete.emit();
  }
}
