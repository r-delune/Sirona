import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogDietItemFormComponent } from './log-diet-item-form.component';

describe('LogDietItemFormComponent', () => {
  let component: LogDietItemFormComponent;
  let fixture: ComponentFixture<LogDietItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDietItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDietItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
