import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNoDataValueComponent } from './table-no-data-value.component';

describe('TableNoDataValueComponent', () => {
  let component: TableNoDataValueComponent;
  let fixture: ComponentFixture<TableNoDataValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNoDataValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNoDataValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
