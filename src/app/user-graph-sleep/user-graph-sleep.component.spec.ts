import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphSleepComponent } from './user-graph-sleep.component';

describe('UserGraphSleepComponent', () => {
  let component: UserGraphSleepComponent;
  let fixture: ComponentFixture<UserGraphSleepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphSleepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
