import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGraphComponent } from './user-graph.component';
import { TreeModule } from 'ng2-tree';
import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
//import { calculateViewDimensions } from '../common/view-dimensions.helper';
//import { ColorHelper } from '../common/color.helper';
//import { BaseChartComponent } from '../common/base-chart.component';

describe('UserGraphComponent', () => {
  let component: UserGraphComponent;
  let fixture: ComponentFixture<UserGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
