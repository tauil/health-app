import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel } from '@angular/forms';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';
import { ClinicService } from '../../../clinic/services/clinic.service';
import { Clinic } from '../../../clinic/clinic';

@Component({
  selector: 'app-edit-therapist',
  templateUrl: './edit-therapist.component.html',
  styleUrls: ['./edit-therapist.component.css']
})
export class EditTherapistComponent implements OnInit {

  therapist: Therapist;
  clinics: Array<Clinic>;

  constructor( private therapistService: TherapistService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private clinicService: ClinicService ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.therapistService.find(parseInt(params['id'])).subscribe(therapist => {
        this.therapist = therapist;
      });
    });
  }

  ngOnInit() {
    this.loadClinics();
  }

  update() {
    this.therapistService.update(this.therapist).subscribe(updated => {
      if (updated) this.router.navigate(['/therapists/' + this.therapist.id]);
    });
  }

  loadClinics() {
    this.clinicService.list().subscribe(
      clinics => (this.clinics = clinics),
      error => console.log(error)
    );
  }

}
