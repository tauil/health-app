/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditClinicComponent } from './edit-clinic.component';

describe('EditClinicComponent', () => {
  let component: EditClinicComponent;
  let fixture: ComponentFixture<EditClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
