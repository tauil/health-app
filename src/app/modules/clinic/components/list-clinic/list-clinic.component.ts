import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../clinic';

@Component({
  selector: 'app-list-clinic',
  templateUrl: './list-clinic.component.html',
  styleUrls: ['./list-clinic.component.css']
})
export class ListClinicComponent implements OnInit {

  clinics: Array<Clinic>;

  constructor(private clinicService: ClinicService) {
  }

  ngOnInit() {
    this.loadClinics();
  }

  loadClinics() {
    this.clinicService.list().subscribe(
      clinics => (this.clinics = clinics),
      error => console.log(error)
    );
  }

}
