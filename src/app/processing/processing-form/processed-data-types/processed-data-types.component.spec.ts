import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedDataTypesComponent } from './processed-data-types.component';

describe('ProcessedDataTypesComponent', () => {
  let component: ProcessedDataTypesComponent;
  let fixture: ComponentFixture<ProcessedDataTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedDataTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedDataTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
