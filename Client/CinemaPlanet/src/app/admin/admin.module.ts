import { StringTrimmerPipe } from './pipes/stringTrimmer.pipe';
import { CustomCurrencyPipe } from './pipes/customCurrency.pipe';
import { PropertyNameCorrectorPipe } from './pipes/propertyNameCorrector.pipe';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AuditoriumsComponent } from './auditoriums/auditoriums.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieSessionsComponent } from './movie-sessions/movie-sessions.component';
import { AuditoriumFormComponent } from './auditoriums/auditorium-form/auditorium-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from './form-container/form-container.component';
import { DataContainerComponent } from './data-container/data-container.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AuditoriumsComponent,
    MoviesComponent,
    MovieSessionsComponent,
    PropertyNameCorrectorPipe,
    AuditoriumFormComponent,
    FormContainerComponent,
    DataContainerComponent,
    CustomCurrencyPipe,
    StringTrimmerPipe,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [],
})
export class AdminModule {}
