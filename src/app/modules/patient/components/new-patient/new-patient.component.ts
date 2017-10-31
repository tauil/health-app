import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';

@Component({
  selector: 'new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  patient: Patient = {id: null, name: '', clinic_id: null, therapist_id: null};

  constructor(private patientService: PatientService, public router: Router) { }

  ngOnInit() {
  }

  save() {
    this.patientService.create(this.patient).subscribe(patient => {
      this.router.navigate(['/patients/' + patient.id]);
    });
  }

}
