import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGraphEnergyLevelComponent } from './user-graph-energy-level.component';

describe('UserGraphEnergyLevelComponent', () => {
  let component: UserGraphEnergyLevelComponent;
  let fixture: ComponentFixture<UserGraphEnergyLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphEnergyLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphEnergyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
