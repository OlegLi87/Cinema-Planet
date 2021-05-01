import { HttpDataService } from './services/http_services/httpData.service';
import { DataRepositoryService } from './services/dataRepository.service';
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
import { AddDataContainerComponent } from './add-data-container/add-data-container.component';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { MovieSessionFormComponent } from './movie-sessions/movie-session-form/movie-session-form.component';
import { genresStreamProvider } from './services/dependency_providers/genresStream.provider';
import { auditoriumsStreamProvider } from './services/dependency_providers/auditoriumsStream.provider';
import { movieSessionsStreamProvider } from './services/dependency_providers/movieSessionsStream.povider';
import { moviesStreamProvider } from './services/dependency_providers/moviesStream.provider';
import { overallStatStreamProvider } from './services/dependency_providers/overallStatStream.provider';

@NgModule({
  declarations: [
    AdminMainComponent,
    AuditoriumsComponent,
    MoviesComponent,
    MovieSessionsComponent,
    AuditoriumFormComponent,
    FormContainerComponent,
    DataContainerComponent,
    AddDataContainerComponent,
    MovieFormComponent,
    MovieSessionFormComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  providers: [
    DataRepositoryService,
    HttpDataService,
    overallStatStreamProvider,
    auditoriumsStreamProvider,
    moviesStreamProvider,
    genresStreamProvider,
    movieSessionsStreamProvider,
  ],
})
export class AdminModule {}
