import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGraphSleepQualityComponent } from './user-graph-sleep-quality.component';

describe('UserGraphSleepQualityComponent', () => {
  let component: UserGraphSleepQualityComponent;
  let fixture: ComponentFixture<UserGraphSleepQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphSleepQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphSleepQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
