import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphAppetiteLevelComponent } from './user-graph-appetite-level.component';

describe('UserGraphAppetiteLevelComponent', () => {
  let component: UserGraphAppetiteLevelComponent;
  let fixture: ComponentFixture<UserGraphAppetiteLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphAppetiteLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphAppetiteLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
