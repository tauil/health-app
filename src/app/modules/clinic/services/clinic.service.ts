import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Clinic } from '../clinic';

const DATA = [{id: 1, name: "North ABC"}, {id: 2, name: "South ABC"}, {id: 3, name: "East ABC"}];

@Injectable()
export class ClinicService {

  constructor() {
    let data = JSON.stringify(DATA);
    localStorage.setItem('clinics', data);
  }

  find(id: number):Observable<Clinic> {
    let clinics = this.loadClinicsData();
    return new Observable(observer => {
      observer.next(clinics.filter(clinic => clinic.id === id)[0]);
      observer.complete();
    });
  }

  list():Observable<Array<Clinic>> {
    return new Observable(observer => {
      observer.next(this.loadClinicsData());
      observer.complete();
    });
  }

  create(clinic: Clinic) {

  }

  update(clinic: Clinic) {

  }

  destroy(id: number) {

  }

  private loadClinicsData():Array<Clinic> {
    return JSON.parse(localStorage.getItem('clinics'));
  }

}
