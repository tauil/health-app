import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './patient.routes';

import { ShowPatientComponent } from './components/show-patient/show-patient.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component';

import { PatientService } from './services/patient.service';

@NgModule({
  declarations: [ ShowPatientComponent, ListPatientComponent, EditPatientComponent, NewPatientComponent ],
  imports: [
    RouterModule.forRoot(ROUTES),
    CommonModule,
    FormsModule
  ],
  providers: [ PatientService ]
})
export class PatientModule { }
