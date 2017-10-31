import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClinicModule } from './modules/clinic/clinic.module';
import { TherapistModule } from './modules/therapist/therapist.module';

import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES, {useHash: false}),
    BrowserModule,
    FormsModule,
    HttpModule,
    ClinicModule,
    TherapistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
