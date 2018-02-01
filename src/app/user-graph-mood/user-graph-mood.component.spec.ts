import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphMoodComponent } from './user-graph-mood.component';

describe('UserGraphMoodComponent', () => {
  let component: UserGraphMoodComponent;
  let fixture: ComponentFixture<UserGraphMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
