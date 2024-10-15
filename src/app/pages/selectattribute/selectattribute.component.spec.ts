import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectattributeComponent } from './selectattribute.component';

describe('SelectattributeComponent', () => {
  let component: SelectattributeComponent;
  let fixture: ComponentFixture<SelectattributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectattributeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectattributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
