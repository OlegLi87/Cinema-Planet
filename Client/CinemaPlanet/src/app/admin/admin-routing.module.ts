import { AdminRoutesResolverService } from '../services/route_resolvers/adminRoutesResolver.service';
import { MovieSessionsComponent } from './movie-sessions/movie-sessions.component';
import { MoviesComponent } from './movies/movies.component';
import { AuditoriumsComponent } from './auditoriums/auditoriums.component';
import { MainGuardService } from '../services/route_guards/mainGuard.service';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminMainComponent,
    resolve: { res: AdminRoutesResolverService },
    canActivate: [MainGuardService],
    children: [
      {
        path: 'auditoriums',
        component: AuditoriumsComponent,
        resolve: { res: AdminRoutesResolverService },
      },
      { path: 'movies', component: MoviesComponent },
      { path: 'movieSessions', component: MovieSessionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
