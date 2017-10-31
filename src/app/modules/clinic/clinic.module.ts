import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ROUTES } from './clinic.routes';

import { ShowClinicComponent } from './components/show-clinic/show-clinic.component';
import { ListClinicComponent } from './components/list-clinic/list-clinic.component';

import { ClinicService } from './services/clinic.service';

@NgModule({
  declarations: [ ShowClinicComponent, ListClinicComponent ],
  imports: [
    RouterModule.forRoot(ROUTES),
    CommonModule
  ],
  providers: [ ClinicService ]
})
export class ClinicModule { }
