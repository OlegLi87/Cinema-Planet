import { MOVIE_SESSIONS_STREAM } from './../services/dependency_providers/movieSessionsStream.povider';
import { distinctUntilChanged } from 'rxjs/operators';
import { DataRepositoryService } from '../services/dataRepository.service';
import { MovieSession } from './../../models/domain_models/movieSession.model';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormContext } from '../form-container/form-container.component';

@Component({
  selector: 'movie-sessions',
  templateUrl: './movie-sessions.component.html',
  styleUrls: ['./movie-sessions.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MovieSessionsComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  private selectedMoveSession: MovieSession;

  movieSessions: MovieSession[];
  isLoading = false;
  showConfirmModal = false;
  showForm = false;

  constructor(
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>,
    @Inject(MOVIE_SESSIONS_STREAM)
    private $movieSessionsStream: BehaviorSubject<MovieSession[]>,
    private dataRepositoryService: DataRepositoryService
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        if (!isLoading && this.selectedMoveSession) {
          this.selectedMoveSession = null;
        }
      });

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

  onEditBtnClicked(selecetedMovieSession: MovieSession): void {
    this.selectedMoveSession = selecetedMovieSession;
    this.toggleShowForm();
  }

  onDeleteBtnClicked(selectedMovieSession: MovieSession): void {
    this.selectedMoveSession = selectedMovieSession;
    this.toggleShowConfirmModal();
  }

  onConfirmModalClosed(result: boolean) {
    this.toggleShowConfirmModal();
    if (result)
      this.dataRepositoryService.deleteMovieSession(
        this.selectedMoveSession.id,
        this.$isLoadingStream
      );
    else {
      this.selectedMoveSession = null;
    }
  }

  onAddBtnClicked(): void {
    this.toggleShowForm();
  }

  toggleShowForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedMoveSession = null;
  }

  get formContext(): FormContext {
    return {
      contextObj: this.selectedMoveSession,
      contextName: 'movieSession',
    };
  }

  get maxStringLength(): number {
    const windowWidth = window.innerWidth;
    if (windowWidth < 340) return 3;
    if (windowWidth < 576) return 8;
    if (windowWidth < 1100) return 10;
    else return 16;
  }

  movieSessionIdentity(index: number, movieSession: MovieSession): number {
    return movieSession.id;
  }

  private toggleShowConfirmModal(): void {
    this.showConfirmModal = !this.showConfirmModal;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
