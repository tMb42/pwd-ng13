import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeRetirementComponent } from './je-retirement.component';

describe('JeRetirementComponent', () => {
  let component: JeRetirementComponent;
  let fixture: ComponentFixture<JeRetirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeRetirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
