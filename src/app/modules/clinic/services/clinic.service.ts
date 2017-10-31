import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Clinic } from '../clinic';

const DATA = [{id: 1, name: "North ABC"}, {id: 2, name: "South ABC"}, {id: 3, name: "East ABC"}];

@Injectable()
export class ClinicService {

  constructor() {
    let clinics = this.loadClinicsData();
    if (clinics.length === 0) {
      let data = JSON.stringify(DATA);
      localStorage.setItem('clinics', data);
    }
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

  create(clinic: Clinic):Observable<Clinic> {
    let component = this;

    return new Observable(observer => {
      let clinics = component.loadClinicsData();
      component.newID().subscribe(id => {
        clinic.id = id;
        clinics.push(clinic);
        component.setData(clinics);
        observer.next(clinic);
        observer.complete();
      });
    });
  }

  update(clinic: Clinic):Observable<Clinic> {
    let component = this;

    return new Observable(observer => {
      let clinics = component.loadClinicsData();

      clinics.forEach(c => {
        if (c.id === clinic.id) c.name = clinic.name;
      });

      component.setData(clinics);
      observer.next(clinic);
      observer.complete();
    });
  }

  destroy(id: number) {

  }

  private loadClinicsData():Array<Clinic> {
    return JSON.parse(localStorage.getItem('clinics'));
  }

  private setData(data):void {
    let dataString = JSON.stringify(data);
    localStorage.setItem('clinics', dataString);
  }

  private newID():Observable<number> {
    let component = this;

    return new Observable(observer => {
      component.list().subscribe(
        clinics => {
          let clinicsIds = clinics.map(clinic => clinic.id);
          let newId = Math.max.apply(null, clinicsIds) + 1;
          observer.next(newId);
          observer.complete();
        },
        error => console.log(error)
      );
    });
  }

}
