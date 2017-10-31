import { Component, OnInit } from '@angular/core';
import { TherapistService } from '../../services/therapist.service';
import { Therapist } from '../../therapist';

@Component({
  selector: 'app-list-therapist',
  templateUrl: './list-therapist.component.html',
  styleUrls: ['./list-therapist.component.css']
})
export class ListTherapistComponent implements OnInit {

  therapists: Array<Therapist>;

  constructor(private therapistService: TherapistService) {
  }

  ngOnInit() {
    this.loadTherapists();
  }

  loadTherapists() {
    this.therapistService.list().subscribe(
      therapists => (this.therapists = therapists),
      error => console.log(error)
    );
  }

  destroyTherapist(therapist: Therapist) {
    if (!confirm("Are you sure?")) return;
    this.therapistService.destroy(therapist).subscribe(done => {
      if (done) this.loadTherapists();
    });
  }

}
