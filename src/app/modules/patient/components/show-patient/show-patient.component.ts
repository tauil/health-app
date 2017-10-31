import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';

@Component({
  selector: 'show-patient',
  templateUrl: './show-patient.component.html',
  styleUrls: ['./show-patient.component.css']
})
export class ShowPatientComponent implements OnInit {

  patient: Patient;

  constructor(private patientService: PatientService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.patientService.find(parseInt(params['id'])).subscribe(patient => {
        this.patient = patient;
      });
    });
  }

  ngOnInit() {
  }

}
