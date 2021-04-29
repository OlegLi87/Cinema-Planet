import { MOVIES_STREAM } from './../../../infastructure/dependency_providers/moviesStream.provider';
import { AUDITORIUMS_STREAM } from './../../../infastructure/dependency_providers/auditoriumsStream.provider';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../../infastructure/dependency_providers/isLoadingStream.provider';
import { MovieSession } from './../../../models/domain_models/movieSession.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Subject, BehaviorSubject } from 'rxjs';
import { Auditorium } from '../../../models/domain_models/auditorium.model';
import { Movie } from '../../../models/domain_models/movie.model';

type SelectOption = { id: number; name: string };
type SelectOptionValues = { [key: string]: SelectOption[] };

@Component({
  selector: 'movie-session-form',
  templateUrl: './movie-session-form.component.html',
  styleUrls: ['./movie-session-form.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MovieSessionFormComponent implements OnInit {
  @Input() movieSessionContext: MovieSession;
  form: FormGroup;
  selectOptionValues: SelectOptionValues = {};
  isFormSubmitted = false;

  constructor(
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>,
    @Inject(MOVIES_STREAM) private $movieStream: BehaviorSubject<Movie[]>
  ) {}

  ngOnInit(): void {
    this.fetchSelectOptionValues();
    this.initForm();
  }

  fetchSelectOptionValues(): void {
    this.$auditoriumsStream.subscribe((audits) => {
      if (audits) this.setSelectOptionValues(audits, 'auditoriums');
    });

    this.$movieStream.subscribe((movies) => {
      if (movies) this.setSelectOptionValues(movies, 'movies');
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
  }

  private setSelectOptionValues(
    data: SelectOption[],
    selectName: string
  ): void {
    this.selectOptionValues[selectName] = data;
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
        Validators.required
      ),
    });
  }
}
