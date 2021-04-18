import { OverallStatPropertyPipe } from './pipes/overallStatProperty.pipe';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AuditoriumsComponent } from './auditoriums/auditoriums.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieSessionsComponent } from './movie-sessions/movie-sessions.component';
import { AuditoriumComponent } from './auditoriums/auditorium/auditorium.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AuditoriumsComponent,
    MoviesComponent,
    MovieSessionsComponent,
    OverallStatPropertyPipe,
    AuditoriumComponent,
  ],
  imports: [SharedModule, CommonModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
