import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsComponent } from './previews.component';

describe('PreviewsComponent', () => {
  let component: PreviewsComponent;
  let fixture: ComponentFixture<PreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
