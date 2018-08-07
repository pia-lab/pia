import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingDataTypesComponent } from './processing-data-types.component';

describe('ProcessingDataTypesComponent', () => {
  let component: ProcessingDataTypesComponent;
  let fixture: ComponentFixture<ProcessingDataTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingDataTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingDataTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
