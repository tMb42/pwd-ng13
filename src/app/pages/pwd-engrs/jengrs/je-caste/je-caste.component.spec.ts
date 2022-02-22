import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeCasteComponent } from './je-caste.component';

describe('JeCasteComponent', () => {
  let component: JeCasteComponent;
  let fixture: ComponentFixture<JeCasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeCasteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeCasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
