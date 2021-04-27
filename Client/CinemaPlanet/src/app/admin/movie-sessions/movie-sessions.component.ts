import { distinctUntilChanged } from 'rxjs/operators';
import { DataRepositoryService } from './../../services/dataRepository.service';
import { MovieSession } from './../../models/domain_models/movieSession.model';
import { IS_LOADING_STREAM } from 'src/app/infastructure/dependency_providers/isLoadingStream.provider';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { isLoadingStreamProvider } from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MOVIE_SESSIONS_STREAM } from 'src/app/infastructure/dependency_providers/movieSessionsStream.povider';

@Component({
  selector: 'movie-sessions',
  templateUrl: './movie-sessions.component.html',
  styleUrls: ['./movie-sessions.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MovieSessionsComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();

  movieSessions: MovieSession[];
  isLoading = false;

  constructor(
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>,
    @Inject(MOVIE_SESSIONS_STREAM)
    private $movieSessionsStream: BehaviorSubject<MovieSession[]>,
    private dataRepositoryService: DataRepositoryService
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.subscriptions[1] = this.$movieSessionsStream.subscribe(
      (movieSessions) => {
        if (!movieSessions)
          return this.dataRepositoryService.streamMovieSessions(
            this.$isLoadingStream
          );

        this.movieSessions = [];
        movieSessions.forEach((ms) => this.movieSessions.push({ ...ms }));
      }
    );
  }

  movieSessionIdentity(index: number, movieSession: MovieSession): number {
    return movieSession.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
