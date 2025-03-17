import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
})
export class TableRowComponent {

  @Input()
  public type: 'string' | 'image' = 'string'

  @Input()
  public columns!: any;

  @Input()
  public datas?: any;
}
