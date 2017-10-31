import { Routes } from '@angular/router';
import { ListTherapistComponent } from './components/list-therapist/list-therapist.component';
import { ShowTherapistComponent } from './components/show-therapist/show-therapist.component';
import { EditTherapistComponent } from './components/edit-therapist/edit-therapist.component';
import { NewTherapistComponent } from './components/new-therapist/new-therapist.component';

export const ROUTES:Routes = [
  {path: 'therapists', component: ListTherapistComponent},
  {path: 'therapists/:id', component: ShowTherapistComponent},
  {path: 'therapists/:id/edit', component: EditTherapistComponent},
  {path: 'therapist/new', component: NewTherapistComponent}
];
