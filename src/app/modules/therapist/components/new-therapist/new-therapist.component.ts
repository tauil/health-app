import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';
import { ClinicService } from '../../../clinic/services/clinic.service';
import { Clinic } from '../../../clinic/clinic';

@Component({
  selector: 'new-therapist',
  templateUrl: './new-therapist.component.html',
  styleUrls: ['./new-therapist.component.css']
})
export class NewTherapistComponent implements OnInit {

  therapist: Therapist = {id: null, name: '', clinic_id: null};
  clinics: Array<Clinic>;

  constructor( private therapistService: TherapistService,
               private router: Router,
               private clinicService: ClinicService ) { }

  ngOnInit() {
    this.loadClinics();
  }

  save() {
    this.therapistService.create(this.therapist).subscribe(therapist => {
      this.router.navigate(['/therapists/' + therapist.id]);
    });
  }

  loadClinics() {
    this.clinicService.list().subscribe(
      clinics => (this.clinics = clinics),
      error => console.log(error)
    );
  }

}
