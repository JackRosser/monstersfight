import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckmodalComponent } from './deckmodal.component';

describe('DeckmodalComponent', () => {
  let component: DeckmodalComponent;
  let fixture: ComponentFixture<DeckmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
