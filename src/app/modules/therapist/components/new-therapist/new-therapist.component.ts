import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';

@Component({
  selector: 'new-therapist',
  templateUrl: './new-therapist.component.html',
  styleUrls: ['./new-therapist.component.css']
})
export class NewTherapistComponent implements OnInit {

  therapist: Therapist = {id: null, name: '', clinic_id: null};

  constructor(private therapistService: TherapistService, public router: Router) { }

  ngOnInit() {
  }

  save() {
    this.therapistService.create(this.therapist).subscribe(therapist => {
      this.router.navigate(['/therapists/' + therapist.id]);
    });
  }

}
