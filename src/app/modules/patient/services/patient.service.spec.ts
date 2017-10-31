/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientService } from './patient.service';

const DATA = [{id: 1, name: "Isabella Garcia", clinic_id: 1, therapist_id: 1}, {id: 2, name: "Sonny Fields", clinic_id: 2, therapist_id: 2}, {id: 3, name: "Mika Ziffly", clinic_id: 2, therapist_id: 3}];

describe('PatientService', () => {
  beforeEach(() => {
    localStorage.removeItem('patients');
    TestBed.configureTestingModule({
      providers: [PatientService]
    });
  });

  describe('.constructor', () => {
    it('should setItem patients in localStorage', inject([PatientService], (service: PatientService) => {
      expect(localStorage.getItem('patients')).not.toBe(null);
      expect(localStorage.getItem('patients')).toEqual(JSON.stringify(DATA));
    }));
  });

  describe('#find', () => {
    it('should return a single patient record', inject([PatientService], (service: PatientService) => {
      service.find(1).subscribe(patient => {
        expect(patient.id).toEqual(1);
        expect(patient.name).toEqual('Isabella Garcia');
        expect(patient.clinic_id).toEqual(1);
        expect(patient.therapist_id).toEqual(1);
      });
    }));
  });

  describe('#list', () => {
    it('should return all patient records', inject([PatientService], (service: PatientService) => {
      service.list().subscribe(patients => {
        expect(patients.length).toEqual(3);
        expect(patients[0].id).toEqual(1);
        expect(patients[0].name).toEqual('Isabella Garcia');
        expect(patients[0].clinic_id).toEqual(1);
        expect(patients[0].therapist_id).toEqual(1);
        expect(patients[1].id).toEqual(2);
        expect(patients[1].name).toEqual('Sonny Fields');
        expect(patients[1].clinic_id).toEqual(2);
        expect(patients[1].therapist_id).toEqual(2);
        expect(patients[2].id).toEqual(3);
        expect(patients[2].name).toEqual('Mika Ziffly');
        expect(patients[2].clinic_id).toEqual(2);
        expect(patients[2].therapist_id).toEqual(3);
      });
    }));
  });

  describe('#create', () => {
    it('should return the recently created record with an id', inject([PatientService], (service: PatientService) => {
      service.create({id: null, name: 'Testing Patient', clinic_id: 1, therapist_id: 2}).subscribe(patient => {
        expect(patient.id).toEqual(4);
        expect(patient.name).toEqual('Testing Patient');
        expect(patient.clinic_id).toEqual(1);
        expect(patient.therapist_id).toEqual(2);
      });
    }));

    it('should create the new record in localStorage', inject([PatientService], (service: PatientService) => {
      service.create({id: null, name: 'Testing Patient', clinic_id: 1, therapist_id: 2}).subscribe(patient => {
        let newData = DATA;
        newData.push({id: 4, name: 'Testing Patient', clinic_id: 1, therapist_id: 2});
        expect(localStorage.getItem('patients')).toEqual(JSON.stringify(newData));
      });
    }));
  });

  describe('#update', () => {
    it('should return the recently updated patient record', inject([PatientService], (service: PatientService) => {
      service.update({id: 1, name: 'Jessica Lisbon', clinic_id: 1, therapist_id: 1}).subscribe(patient => {
        expect(patient.id).toEqual(1);
        expect(patient.name).toEqual('Jessica Lisbon');
        expect(patient.clinic_id).toEqual(1);
        expect(patient.therapist_id).toEqual(1);
      });
    }));

    it('should update the record in localStorage', inject([PatientService], (service: PatientService) => {
      service.update({id: 1, name: 'Jessica Lisbon', clinic_id: 1, therapist_id: 1}).subscribe(patient => {
        let patients = JSON.parse(localStorage.getItem('patients'));
        let updatedPatient = patients.filter(patient => patient.id === 1)[0];
        expect(updatedPatient.id).toEqual(1);
        expect(updatedPatient.name).toEqual('Jessica Lisbon');
        expect(updatedPatient.clinic_id).toEqual(1);
        expect(updatedPatient.therapist_id).toEqual(1);
      });
    }));
  });

  describe('#destroy', () => {
    beforeEach(() => {
      localStorage.removeItem('patients');
      let data = JSON.stringify(DATA);
      localStorage.setItem('patients', data);
    });

    it('should return true', inject([PatientService], (service: PatientService) => {
      service.destroy({id: 1, name: 'Isabella Garcia', clinic_id: 1, therapist_id: 1}).subscribe(done => {
        expect(done).toBeTruthy();
      });
    }));

    it('should remove record from localStorage', inject([PatientService], (service: PatientService) => {
      service.destroy({id: 1, name: 'Isabella Garcia', clinic_id: 1, therapist_id: 1}).subscribe(done => {
        let newData = DATA;

        newData.forEach((c, index) => {
          if (c.id === 1) newData.splice(index, 1);
        });

        expect(localStorage.getItem('patients')).toEqual(JSON.stringify(newData));
      });
    }));
  });
});
