import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../clinic';

@Component({
  selector: 'new-clinic',
  templateUrl: './new-clinic.component.html',
  styleUrls: ['./new-clinic.component.css']
})
export class NewClinicComponent implements OnInit {

  clinic: Clinic = {id: null, name: ''};

  constructor(private clinicService: ClinicService, public router: Router) { }

  ngOnInit() {
  }

  save() {
    this.clinicService.create(this.clinic).subscribe(clinic => {
      this.router.navigate(['/clinics/' + clinic.id]);
    });
  }

}
