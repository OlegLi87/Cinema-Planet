import { SharedModule } from './../shared/shared.module';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AuditoriumsComponent } from './auditoriums/auditoriums.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieSessionsComponent } from './movie-sessions/movie-sessions.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AuditoriumsComponent,
    MoviesComponent,
    MovieSessionsComponent,
  ],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class AdminModule {}
