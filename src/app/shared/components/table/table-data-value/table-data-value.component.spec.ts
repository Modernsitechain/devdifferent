import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataValueComponent } from './table-data-value.component';

describe('TableDataValueComponent', () => {
  let component: TableDataValueComponent;
  let fixture: ComponentFixture<TableDataValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDataValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
