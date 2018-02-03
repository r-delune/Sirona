import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphAnalysisComponent } from './user-graph-analysis.component';

describe('UserGraphAnalysisComponent', () => {
  let component: UserGraphAnalysisComponent;
  let fixture: ComponentFixture<UserGraphAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
