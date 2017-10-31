import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Therapist } from '../therapist';

const DATA = [{id: 1, name: "John Smith"}, {id: 2, name: "Jack Flash"}, {id: 3, name: "Maria Lucia"}];

@Injectable()
export class TherapistService {

  constructor() {
    let therapists = this.loadTherapistsData();
    if (!therapists || therapists.length === 0) {
      let data = JSON.stringify(DATA);
      localStorage.setItem('therapists', data);
    }
  }

  find(id: number):Observable<Therapist> {
    let therapists = this.loadTherapistsData();
    return new Observable(observer => {
      observer.next(therapists.filter(therapist => therapist.id === id)[0]);
      observer.complete();
    });
  }

  list():Observable<Array<Therapist>> {
    return new Observable(observer => {
      observer.next(this.loadTherapistsData());
      observer.complete();
    });
  }

  create(therapist: Therapist):Observable<Therapist> {
    let component = this;

    return new Observable(observer => {
      let therapists = component.loadTherapistsData();
      component.newID().subscribe(id => {
        therapist.id = id;
        therapists.push(therapist);
        component.setData(therapists);
        observer.next(therapist);
        observer.complete();
      });
    });
  }

  update(therapist: Therapist):Observable<Therapist> {
    let component = this;

    return new Observable(observer => {
      let therapists = component.loadTherapistsData();

      therapists.forEach(c => {
        if (c.id === therapist.id) c.name = therapist.name;
      });

      component.setData(therapists);
      observer.next(therapist);
      observer.complete();
    });
  }

  destroy(therapist: Therapist):Observable<boolean> {
    let component = this;

    return new Observable(observer => {
      let therapists = component.loadTherapistsData();

      therapists.forEach((c, index) => {
        if (c.id === therapist.id) therapists.splice(index, 1);
      });

      component.setData(therapists);
      observer.next(true);
      observer.complete();
    });
  }

  private loadTherapistsData():Array<Therapist> {
    return JSON.parse(localStorage.getItem('therapists'));
  }

  private setData(data):void {
    let dataString = JSON.stringify(data);
    localStorage.setItem('therapists', dataString);
  }

  private newID():Observable<number> {
    let component = this;

    return new Observable(observer => {
      component.list().subscribe(
        therapists => {
          let therapistsIds = therapists.map(therapist => therapist.id);
          let newId = Math.max.apply(null, therapistsIds) + 1;
          observer.next(newId);
          observer.complete();
        },
        error => console.log(error)
      );
    });
  }

}
