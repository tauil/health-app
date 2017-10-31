import { Routes } from '@angular/router';
import { ListClinicComponent } from './components/list-clinic/list-clinic.component';
import { ShowClinicComponent } from './components/show-clinic/show-clinic.component';
import { EditClinicComponent } from './components/edit-clinic/edit-clinic.component';
import { NewClinicComponent } from './components/new-clinic/new-clinic.component';

export const ROUTES:Routes = [
  {path: 'clinics', component: ListClinicComponent},
  {path: 'clinics/:id', component: ShowClinicComponent},
  {path: 'clinics/:id/edit', component: EditClinicComponent},
  {path: 'clinic/new', component: NewClinicComponent}
];
