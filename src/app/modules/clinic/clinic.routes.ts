import { Routes } from '@angular/router';
import { ListClinicComponent } from './components/list-clinic/list-clinic.component';
import { ShowClinicComponent } from './components/show-clinic/show-clinic.component';

export const ROUTES:Routes = [
    {path: 'clinics', component: ListClinicComponent},
    {path: 'clinics/:id', component: ShowClinicComponent},
];
