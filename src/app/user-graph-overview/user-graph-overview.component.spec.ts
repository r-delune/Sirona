import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphOverviewComponent } from './user-graph-overview.component';

describe('UserGraphOverviewComponent', () => {
  let component: UserGraphOverviewComponent;
  let fixture: ComponentFixture<UserGraphOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
