import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './clinic.routes';

import { ShowClinicComponent } from './components/show-clinic/show-clinic.component';
import { ListClinicComponent } from './components/list-clinic/list-clinic.component';
import { EditClinicComponent } from './components/edit-clinic/edit-clinic.component';

import { ClinicService } from './services/clinic.service';

@NgModule({
  declarations: [ ShowClinicComponent, ListClinicComponent, EditClinicComponent ],
  imports: [
    RouterModule.forRoot(ROUTES),
    CommonModule,
    FormsModule
  ],
  providers: [ ClinicService ]
})
export class ClinicModule { }
