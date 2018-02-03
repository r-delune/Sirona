import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExcerciseItemFormComponent } from './log-excercise-item-form.component';

describe('LogExcerciseItemFormComponent', () => {
  let component: LogExcerciseItemFormComponent;
  let fixture: ComponentFixture<LogExcerciseItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogExcerciseItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogExcerciseItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
