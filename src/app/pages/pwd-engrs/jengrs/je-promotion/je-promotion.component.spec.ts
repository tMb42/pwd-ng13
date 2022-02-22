import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JePromotionComponent } from './je-promotion.component';

describe('JePromotionComponent', () => {
  let component: JePromotionComponent;
  let fixture: ComponentFixture<JePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
