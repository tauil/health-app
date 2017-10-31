import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';
import { ClinicService } from '../../../clinic/services/clinic.service';

@Component({
  selector: 'show-patient',
  templateUrl: './show-patient.component.html',
  styleUrls: ['./show-patient.component.css']
})
export class ShowPatientComponent implements OnInit {

  patient: Patient;
  clinicName: string;

  constructor(private patientService: PatientService, private activatedRoute: ActivatedRoute, private clinicService: ClinicService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.patientService.find(parseInt(params['id'])).subscribe(patient => {
        this.patient = patient;
      });
    });
  }

  ngOnInit() {
    this.clinicNameFromId(this.patient.clinic_id);
  }

  clinicNameFromId(id) {
    if (!id) return;
    this.clinicService.find(parseInt(id)).subscribe(clinic => this.clinicName = clinic.name);
  }

}
