import { distinctUntilChanged } from 'rxjs/operators';
import { DataRepositoryService } from './../../../services/dataRepository.service';
import { MOVIES_STREAM } from './../../../infastructure/dependency_providers/moviesStream.provider';
import { AUDITORIUMS_STREAM } from './../../../infastructure/dependency_providers/auditoriumsStream.provider';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../../infastructure/dependency_providers/isLoadingStream.provider';
import { MovieSession } from './../../../models/domain_models/movieSession.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { formatDate } from '@angular/common';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Auditorium } from '../../../models/domain_models/auditorium.model';
import { Movie } from '../../../models/domain_models/movie.model';
import { futureDateValidator } from '../../../shared/form_control_validators/future-date.validator';
import { Output } from '@angular/core';

@Component({
  selector: 'movie-session-form',
  templateUrl: './movie-session-form.component.html',
  styleUrls: ['./movie-session-form.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MovieSessionFormComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();

  @Input() movieSessionContext: MovieSession;
  @Output() formProcessingEnd = new EventEmitter<void>();
  form: FormGroup;
  isLoading = false;
  isFormSubmitted = false;
  auditoriums: Auditorium[];
  movies: Movie[];

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>,
    @Inject(MOVIES_STREAM) private $movieStream: BehaviorSubject<Movie[]>
  ) {}

  ngOnInit(): void {
    this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        if (!isLoading && this.isFormSubmitted) {
          this.formProcessingEnd.emit();
        }
      });
    this.setSelectOptions();
    this.initForm();
  }

  setSelectOptions(): void {
    this.subscriptions[1] = this.$auditoriumsStream.subscribe((audits) => {
      if (!audits) return this.dataRepositoryService.streamAuditoriums();
      this.auditoriums = [];
      audits.forEach((audit) => this.auditoriums.push({ ...audit }));
    });

    this.subscriptions[2] = this.$movieStream.subscribe((movies) => {
      if (!movies) return this.dataRepositoryService.streamMovies();
      this.movies = [];
      movies.forEach((movie) => this.movies.push({ ...movie }));
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.form.valid)
      this.dataRepositoryService.saveMovieSession(
        { id: this.movieSessionContext?.id, ...this.form.value },
        this.$isLoadingStream
      );
  }

  private initForm(): void {
    const sessionDate = this.movieSessionContext
      ? this.movieSessionContext.sessionDate
      : new Date(Date.now() + 1000 * 3600 * 24);

    this.form = new FormGroup({
      auditoriumId: new FormControl(
        this.movieSessionContext?.auditoriumId,
        Validators.required
      ),
      movieId: new FormControl(
        this.movieSessionContext?.movieId,
        Validators.required
      ),
      sessionDate: new FormControl(
        formatDate(sessionDate, 'yyyy-MM-dd', 'en'),
        [Validators.required, futureDateValidator]
      ),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
