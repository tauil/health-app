import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';
import { ClinicService } from '../../../clinic/services/clinic.service';

@Component({
  selector: 'show-therapist',
  templateUrl: './show-therapist.component.html',
  styleUrls: ['./show-therapist.component.css']
})
export class ShowTherapistComponent implements OnInit {

  therapist: Therapist;
  clinicName: string;

  constructor(private therapistService: TherapistService, private activatedRoute: ActivatedRoute, private clinicService: ClinicService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.therapistService.find(parseInt(params['id'])).subscribe(therapist => {
        this.therapist = therapist;
      });
    });
  }

  ngOnInit() {
    this.clinicNameFromId(this.therapist.clinic_id);
  }

  clinicNameFromId(id) {
    if (!id) return;
    this.clinicService.find(parseInt(id)).subscribe(clinic => this.clinicName = clinic.name);
  }

}
