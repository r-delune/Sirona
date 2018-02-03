import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMoodItemFormComponent } from './log-mood-item-form.component';

describe('LogMoodItemFormComponent', () => {
  let component: LogMoodItemFormComponent;
  let fixture: ComponentFixture<LogMoodItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogMoodItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMoodItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
