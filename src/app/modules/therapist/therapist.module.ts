import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './therapist.routes';

import { ShowTherapistComponent } from './components/show-therapist/show-therapist.component';
import { ListTherapistComponent } from './components/list-therapist/list-therapist.component';
import { EditTherapistComponent } from './components/edit-therapist/edit-therapist.component';
import { NewTherapistComponent } from './components/new-therapist/new-therapist.component';

import { TherapistService } from './services/therapist.service';

@NgModule({
  declarations: [ ShowTherapistComponent, ListTherapistComponent, EditTherapistComponent, NewTherapistComponent ],
  imports: [
    RouterModule.forRoot(ROUTES),
    CommonModule,
    FormsModule
  ],
  providers: [ TherapistService ]
})
export class TherapistModule { }
