import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../patient';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  patients: Array<Patient>;

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.list().subscribe(
      patients => (this.patients = patients),
      error => console.log(error)
    );
  }

  destroyPatient(patient: Patient) {
    if (!confirm("Are you sure?")) return;
    this.patientService.destroy(patient).subscribe(done => {
      if (done) this.loadPatients();
    });
  }

}
