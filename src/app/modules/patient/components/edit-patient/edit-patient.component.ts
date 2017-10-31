import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  patient: Patient;

  constructor(private patientService: PatientService, private activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.patientService.find(parseInt(params['id'])).subscribe(patient => {
        this.patient = patient;
      });
    });
  }

  ngOnInit() {
  }

  update() {
    this.patientService.update(this.patient).subscribe(updated => {
      if (updated) this.router.navigate(['/patients/' + this.patient.id]);
    });
  }

}
