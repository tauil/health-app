import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';
import { ClinicService } from '../../../clinic/services/clinic.service';
import { Clinic } from '../../../clinic/clinic';
import { TherapistService } from '../../../therapist/services/therapist.service';
import { Therapist } from '../../../therapist/therapist';

@Component({
  selector: 'new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  patient: Patient = {id: null, name: '', clinic_id: null, therapist_id: null};
  clinics: Array<Clinic>;
  therapists: Array<Therapist>;

  constructor( private patientService: PatientService,
               private router: Router,
               private clinicService: ClinicService,
               private therapistService: TherapistService ) { }

  ngOnInit() {
    this.loadClinics();
    this.loadTherapists();
  }

  save() {
    this.patientService.create(this.patient).subscribe(patient => {
      this.router.navigate(['/patients/' + patient.id]);
    });
  }

  loadClinics() {
    this.clinicService.list().subscribe(
      clinics => (this.clinics = clinics),
      error => console.log(error)
    );
  }

  loadTherapists() {
    this.therapistService.list().subscribe(
      therapists => (this.therapists = therapists),
      error => console.log(error)
    );
  }

}
