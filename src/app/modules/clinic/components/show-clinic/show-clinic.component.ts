import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../clinic';

@Component({
  selector: 'show-clinic',
  templateUrl: './show-clinic.component.html',
  styleUrls: ['./show-clinic.component.css']
})
export class ShowClinicComponent implements OnInit {

  clinic: Clinic;

  constructor(private clinicService: ClinicService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.clinicService.find(parseInt(params['id'])).subscribe(clinic => {
        this.clinic = clinic;
      });
    });
  }

  ngOnInit() {
  }

}
