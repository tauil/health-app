/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TherapistService } from './therapist.service';

describe('TherapistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TherapistService]
    });
  });

  it('should ...', inject([TherapistService], (service: TherapistService) => {
    expect(service).toBeTruthy();
  }));
});
