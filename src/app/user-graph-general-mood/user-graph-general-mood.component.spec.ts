import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphGeneralMoodComponent } from './user-graph-general-mood.component';

describe('UserGraphGeneralMoodComponent', () => {
  let component: UserGraphGeneralMoodComponent;
  let fixture: ComponentFixture<UserGraphGeneralMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphGeneralMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphGeneralMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
