import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';
import { ClinicService } from '../../../clinic/services/clinic.service';
import { Clinic } from '../../../clinic/clinic';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  patient: Patient;
  clinics: Array<Clinic>;

  constructor( private patientService: PatientService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private clinicService: ClinicService ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.patientService.find(parseInt(params['id'])).subscribe(patient => {
        this.patient = patient;
      });
    });
  }

  ngOnInit() {
    this.loadClinics();
  }

  update() {
    this.patientService.update(this.patient).subscribe(updated => {
      if (updated) this.router.navigate(['/patients/' + this.patient.id]);
    });
  }

  loadClinics() {
    this.clinicService.list().subscribe(
      clinics => (this.clinics = clinics),
      error => console.log(error)
    );
  }

}
