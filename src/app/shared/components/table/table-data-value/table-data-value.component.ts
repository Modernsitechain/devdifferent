import { Component, input } from '@angular/core';
import { TableValueType } from '@app/core/types';
import { ImageComponent } from '@app/shared/components/media/image/image.component';

@Component({
  selector: 'app-table-data-value',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './table-data-value.component.html',
  styleUrl: './table-data-value.component.scss'
})
export class TableDataValueComponent {
  public value = input.required<any>();
  public type = input<TableValueType>('text');
}
