import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphExcerciseComponent } from './user-graph-excercise.component';

describe('UserGraphExcerciseComponent', () => {
  let component: UserGraphExcerciseComponent;
  let fixture: ComponentFixture<UserGraphExcerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphExcerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphExcerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
