import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';

@Component({
  selector: 'show-therapist',
  templateUrl: './show-therapist.component.html',
  styleUrls: ['./show-therapist.component.css']
})
export class ShowTherapistComponent implements OnInit {

  therapist: Therapist;

  constructor(private therapistService: TherapistService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params || !params['id']) return;
      this.therapistService.find(parseInt(params['id'])).subscribe(therapist => {
        this.therapist = therapist;
      });
    });
  }

  ngOnInit() {
  }

}
