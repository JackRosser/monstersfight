import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmonsterComponent } from './mainmonster.component';

describe('MainmonsterComponent', () => {
  let component: MainmonsterComponent;
  let fixture: ComponentFixture<MainmonsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainmonsterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainmonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
