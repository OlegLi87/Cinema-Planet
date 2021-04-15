import { MovieSessionsComponent } from './movie-sessions/movie-sessions.component';
import { MoviesComponent } from './movies/movies.component';
import { AuditoriumsComponent } from './auditoriums/auditoriums.component';
import { MainGuardService } from '../services/route_guards/mainGuard.service';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [MainGuardService],
    children: [
      { path: 'auditoriums', component: AuditoriumsComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movieSessions', component: MovieSessionsComponent },
    ],
  },
];
