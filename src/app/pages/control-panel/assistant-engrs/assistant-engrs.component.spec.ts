import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantEngrsComponent } from './assistant-engrs.component';

describe('AssistantEngrsComponent', () => {
  let component: AssistantEngrsComponent;
  let fixture: ComponentFixture<AssistantEngrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantEngrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantEngrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
