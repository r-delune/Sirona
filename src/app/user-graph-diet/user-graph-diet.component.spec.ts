import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphDietComponent } from './user-graph-diet.component';

describe('UserGraphDietComponent', () => {
  let component: UserGraphDietComponent;
  let fixture: ComponentFixture<UserGraphDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
