import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel } from '@angular/forms';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';

@Component({
  selector: 'app-edit-therapist',
  templateUrl: './edit-therapist.component.html',
  styleUrls: ['./edit-therapist.component.css']
})
export class EditTherapistComponent implements OnInit {

  therapist: Therapist;

  constructor(private therapistService: TherapistService, private activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.therapistService.find(parseInt(params['id'])).subscribe(therapist => {
        this.therapist = therapist;
      });
    });
  }

  ngOnInit() {
  }

  update() {
    this.therapistService.update(this.therapist).subscribe(updated => {
      if (updated) this.router.navigate(['/therapists/' + this.therapist.id]);
    });
  }

}
