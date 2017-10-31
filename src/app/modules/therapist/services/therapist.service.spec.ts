/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TherapistService } from './therapist.service';

const DATA = [{id: 1, name: "John Smith", clinic_id: 1}, {id: 2, name: "Jack Flash", clinic_id: 2}, {id: 3, name: "Maria Lucia", clinic_id: 1}];

describe('TherapistService', () => {
  beforeEach(() => {
    localStorage.removeItem('therapists');
    TestBed.configureTestingModule({
      providers: [TherapistService]
    });
  });

  describe('.constructor', () => {
    it('should setItem therapists in localStorage', inject([TherapistService], (service: TherapistService) => {
      expect(localStorage.getItem('therapists')).not.toBe(null);
      expect(localStorage.getItem('therapists')).toEqual(JSON.stringify(DATA));
    }));
  });

  describe('#find', () => {
    it('should return a single therapist record', inject([TherapistService], (service: TherapistService) => {
      service.find(1).subscribe(therapist => {
        expect(therapist.id).toEqual(1);
        expect(therapist.name).toEqual('John Smith');
      });
    }));
  });

  describe('#list', () => {
    it('should return all therapist records', inject([TherapistService], (service: TherapistService) => {
      service.list().subscribe(therapists => {
        expect(therapists.length).toEqual(3);
        expect(therapists[0].id).toEqual(1);
        expect(therapists[0].name).toEqual('John Smith');
        expect(therapists[1].id).toEqual(2);
        expect(therapists[1].name).toEqual('Jack Flash');
        expect(therapists[2].id).toEqual(3);
        expect(therapists[2].name).toEqual('Maria Lucia');
      });
    }));
  });

  describe('#create', () => {
    it('should return the recently created record with an id', inject([TherapistService], (service: TherapistService) => {
      service.create({id: null, name: 'Testing Therapist', clinic_id: 1}).subscribe(therapist => {
        expect(therapist.id).toEqual(4);
        expect(therapist.name).toEqual('Testing Therapist');
      });
    }));

    it('should create the new record in localStorage', inject([TherapistService], (service: TherapistService) => {
      service.create({id: null, name: 'Testing Therapist', clinic_id: 1}).subscribe(therapist => {
        let newData = DATA;
        newData.push({id: 4, name: 'Testing Therapist', clinic_id: 1});
        expect(localStorage.getItem('therapists')).toEqual(JSON.stringify(newData));
      });
    }));
  });

  describe('#update', () => {
    it('should return the recently updated therapist record', inject([TherapistService], (service: TherapistService) => {
      service.update({id: 1, name: 'Albert Griffin', clinic_id: 1}).subscribe(therapist => {
        expect(therapist.id).toEqual(1);
        expect(therapist.name).toEqual('Albert Griffin');
        expect(therapist.clinic_id).toEqual(1);
      });
    }));

    it('should update the record in localStorage', inject([TherapistService], (service: TherapistService) => {
      service.update({id: 1, name: 'Albert Griffin', clinic_id: 1}).subscribe(therapist => {
        let therapists = JSON.parse(localStorage.getItem('therapists'));
        let updatedTherapist = therapists.filter(therapist => therapist.id === 1)[0];
        expect(updatedTherapist.id).toEqual(1);
        expect(updatedTherapist.name).toEqual('Albert Griffin');
        expect(updatedTherapist.clinic_id).toEqual(1);
      });
    }));
  });

  describe('#destroy', () => {
    beforeEach(() => {
      localStorage.removeItem('therapists');
      let data = JSON.stringify(DATA);
      localStorage.setItem('therapists', data);
    });

    it('should return true', inject([TherapistService], (service: TherapistService) => {
      service.destroy({id: 1, name: 'John Smith', clinic_id: 1}).subscribe(done => {
        expect(done).toBeTruthy();
      });
    }));

    it('should remove record from localStorage', inject([TherapistService], (service: TherapistService) => {
      service.destroy({id: 1, name: 'John Smith', clinic_id: 1}).subscribe(done => {
        let newData = DATA;

        newData.forEach((c, index) => {
          if (c.id === 1) newData.splice(index, 1);
        });

        expect(localStorage.getItem('therapists')).toEqual(JSON.stringify(newData));
      });
    }));
  });
});
