import { Routes } from '@angular/router';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { ShowPatientComponent } from './components/show-patient/show-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component';

export const ROUTES:Routes = [
  {path: 'patients', component: ListPatientComponent},
  {path: 'patients/:id', component: ShowPatientComponent},
  {path: 'patients/:id/edit', component: EditPatientComponent},
  {path: 'patient/new', component: NewPatientComponent}
];
