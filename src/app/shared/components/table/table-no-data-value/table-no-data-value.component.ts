import {
  Component,
  input,
  output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MoovdButton, MoovdLabel } from 'moovd-components';

@Component({
  selector: 'app-table-no-data-value',
  standalone: true,
  imports: [
    TranslateModule,
    MoovdButton,
    MoovdLabel,
  ],
  templateUrl: './table-no-data-value.component.html',
  styleUrl: './table-no-data-value.component.scss',
})
export class TableNoDataValueComponent {
  public dataCount = input.required<number>();
  public contentName = input.required<string>();
  public showAddButton = input<boolean>(false);
  public buttonAction = output<void>();

  protected noDataIllustration =
    'assets/images/illustrations/no-data-illustration.png';

  protected noDataAlt = 'No Data Matching';

  public buttonActionVoid(): void {
    return this.buttonAction.emit();
  }
}
