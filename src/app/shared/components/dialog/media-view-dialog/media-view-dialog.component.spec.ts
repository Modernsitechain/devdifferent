import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewDialogComponent } from './media-view-dialog.component';

describe('MediaViewDialogComponent', () => {
  let component: MediaViewDialogComponent;
  let fixture: ComponentFixture<MediaViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
