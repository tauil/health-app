/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClinicService } from './clinic.service';

const DATA = [{id: 1, name: "North ABC"}, {id: 2, name: "South ABC"}, {id: 3, name: "East ABC"}];

describe('ClinicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicService]
    });
    localStorage.removeItem('clinics');
  });

  describe('.constructor', () => {
    it('should setItem clinics in localStorage', inject([ClinicService], (service: ClinicService) => {
      expect(localStorage.getItem('clinics')).not.toBe(null);
      expect(localStorage.getItem('clinics')).toEqual(JSON.stringify(DATA));
    }));
  });

  describe('#find', () => {
    it('should return a single clinic record', inject([ClinicService], (service: ClinicService) => {
      service.find(1).subscribe(clinic => {
        expect(clinic.id).toEqual(1);
        expect(clinic.name).toEqual('North ABC');
      });
    }));
  });

  describe('#list', () => {
    it('should return all clinic records', inject([ClinicService], (service: ClinicService) => {
      service.list().subscribe(clinics => {
        expect(clinics.length).toEqual(3);
        expect(clinics[0].id).toEqual(1);
        expect(clinics[0].name).toEqual('North ABC');
        expect(clinics[1].id).toEqual(2);
        expect(clinics[1].name).toEqual('South ABC');
        expect(clinics[2].id).toEqual(3);
        expect(clinics[2].name).toEqual('East ABC');
      });
    }));
  });

  describe('#create', () => {
    it('should return the recently created record with an id', inject([ClinicService], (service: ClinicService) => {
      service.create({id: null, name: 'Testing Clinic'}).subscribe(clinic => {
        expect(clinic.id).toEqual(4);
        expect(clinic.name).toEqual('Testing Clinic');
      });
    }));

    it('should create the new record in localStorage', inject([ClinicService], (service: ClinicService) => {
      service.create({id: null, name: 'Testing Clinic'}).subscribe(clinic => {
        let newData = DATA;
        newData.push({id: 4, name: 'Testing Clinic'});
        expect(localStorage.getItem('clinics')).toEqual(JSON.stringify(newData));
      });
    }));
  });

  describe('#update', () => {
    it('should return the recently updated clinic record', inject([ClinicService], (service: ClinicService) => {
      service.update({id: 1, name: 'Changed North ABC'}).subscribe(clinic => {
        expect(clinic.id).toEqual(1);
        expect(clinic.name).toEqual('Changed North ABC');
      });
    }));

    it('should update the record in localStorage', inject([ClinicService], (service: ClinicService) => {
      service.update({id: 1, name: 'Changed North ABC'}).subscribe(clinic => {
        let clinics = JSON.parse(localStorage.getItem('clinics'));
        let updatedClinic = clinics.filter(clinic => clinic.id === 1)[0];
        expect(updatedClinic.id).toEqual(1);
        expect(updatedClinic.name).toEqual('Changed North ABC');
      });
    }));
  });

  describe('#destroy', () => {
    beforeEach(() => {
      localStorage.removeItem('clinics');
      let data = JSON.stringify(DATA);
      localStorage.setItem('clinics', data);
    });

    it('should return true', inject([ClinicService], (service: ClinicService) => {
      service.destroy({id: 1, name: 'North ABC'}).subscribe(done => {
        expect(done).toBeTruthy();
      });
    }));

    it('should remove record from localStorage', inject([ClinicService], (service: ClinicService) => {
      service.destroy({id: 1, name: 'North ABC'}).subscribe(done => {
        let newData = DATA;

        newData.forEach((c, index) => {
          if (c.id === 1) newData.splice(index, 1);
        });

        expect(localStorage.getItem('clinics')).toEqual(JSON.stringify(newData));
      });
    }));
  });
});
