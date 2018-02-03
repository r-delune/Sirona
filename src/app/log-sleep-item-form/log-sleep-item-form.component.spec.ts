import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSleepItemFormComponent } from './log-sleep-item-form.component';

describe('LogSleepItemFormComponent', () => {
  let component: LogSleepItemFormComponent;
  let fixture: ComponentFixture<LogSleepItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSleepItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSleepItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
