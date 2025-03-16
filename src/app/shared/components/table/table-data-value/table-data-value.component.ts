import { Component, input } from '@angular/core';
import { ChipColor, TableValueType } from '@app/core/types';
import { ImageComponent } from '@app/shared/components/media/image/image.component';
import { ChipComponent } from '@app/shared/components/chip/chip.component';

@Component({
  selector: 'app-table-data-value',
  standalone: true,
  imports: [ImageComponent, ChipComponent],
  templateUrl: './table-data-value.component.html',
  styleUrl: './table-data-value.component.scss'
})
export class TableDataValueComponent {
  public value = input.required<any>();
  public type = input<TableValueType>('text');

  public getChipColor(value: string): ChipColor {
    switch (value) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'waiting':
        return 'yellow';
      default:
        return 'default';
    }
  }
}
