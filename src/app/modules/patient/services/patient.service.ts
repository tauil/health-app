import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Patient } from '../patient';

const DATA = [{id: 1, name: "Isabella Garcia"}, {id: 2, name: "Sonny Fields"}, {id: 3, name: "Mika Ziffly"}];

@Injectable()
export class PatientService {

  constructor() {
    let patients = this.loadPatientsData();
    if (!patients) {
      let data = JSON.stringify(DATA);
      localStorage.setItem('patients', data);
    }
  }

  find(id: number):Observable<Patient> {
    let patients = this.loadPatientsData();
    return new Observable(observer => {
      observer.next(patients.filter(patient => patient.id === id)[0]);
      observer.complete();
    });
  }

  list():Observable<Array<Patient>> {
    return new Observable(observer => {
      observer.next(this.loadPatientsData());
      observer.complete();
    });
  }

  create(patient: Patient):Observable<Patient> {
    let component = this;

    return new Observable(observer => {
      let patients = component.loadPatientsData();
      component.newID().subscribe(id => {
        patient.id = id;
        patients.push(patient);
        component.setData(patients);
        observer.next(patient);
        observer.complete();
      });
    });
  }

  update(patient: Patient):Observable<Patient> {
    let component = this;

    return new Observable(observer => {
      let patients = component.loadPatientsData();

      patients.forEach(p => {
        if (p.id === patient.id) {
          p.name = patient.name;
          p.clinic_id = patient.clinic_id;
        }
      });

      component.setData(patients);
      observer.next(patient);
      observer.complete();
    });
  }

  destroy(patient: Patient):Observable<boolean> {
    let component = this;

    return new Observable(observer => {
      let patients = component.loadPatientsData();

      patients.forEach((c, index) => {
        if (c.id === patient.id) patients.splice(index, 1);
      });

      component.setData(patients);
      observer.next(true);
      observer.complete();
    });
  }

  private loadPatientsData():Array<Patient> {
    return JSON.parse(localStorage.getItem('patients'));
  }

  private setData(data):void {
    let dataString = JSON.stringify(data);
    localStorage.setItem('patients', dataString);
  }

  private newID():Observable<number> {
    let component = this;

    return new Observable(observer => {
      component.list().subscribe(
        patients => {
          let patientsIds = patients.map(patient => patient.id);
          let newId = Math.max.apply(null, patientsIds) + 1;
          observer.next(newId);
          observer.complete();
        },
        error => console.log(error)
      );
    });
  }

}
