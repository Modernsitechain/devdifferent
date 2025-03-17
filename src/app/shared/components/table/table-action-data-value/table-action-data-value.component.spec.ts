import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionDataValueComponent } from './table-action-data-value.component';

describe('TableActionDataValueComponent', () => {
  let component: TableActionDataValueComponent;
  let fixture: ComponentFixture<TableActionDataValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableActionDataValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableActionDataValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
