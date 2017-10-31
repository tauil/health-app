import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../clinic';

@Component({
  selector: 'app-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.css']
})
export class EditClinicComponent implements OnInit {

  clinic: Clinic;

  constructor(private clinicService: ClinicService, private activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.clinicService.find(parseInt(params['id'])).subscribe(clinic => {
        this.clinic = clinic;
      });
    });
  }

  ngOnInit() {
  }

  update() {
    this.clinicService.update(this.clinic).subscribe(updated => {
      if (updated) this.router.navigate(['/clinics/' + this.clinic.id]);
    });
  }

}
