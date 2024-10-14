import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterselectComponent } from './monsterselect.component';

describe('MonsterselectComponent', () => {
  let component: MonsterselectComponent;
  let fixture: ComponentFixture<MonsterselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonsterselectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
