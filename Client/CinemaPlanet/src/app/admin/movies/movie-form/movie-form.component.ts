import { distinctUntilChanged } from 'rxjs/operators';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../../infastructure/dependency_providers/isLoadingStream.provider';
import { DataRepositoryService } from './../../../services/dataRepository.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GENRES_STREAM } from './../../../infastructure/dependency_providers/genresStream.provider';
import { Movie } from './../../../models/domain_models/movie.model';
import {
  Component,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MovieFormComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  @Input() movieContext: Movie;
  @Output() formProcessingEnd = new EventEmitter<void>();
  isSelectFieldClicked = false;
  submitBtnClicked = false;
  isLoading = false;
  genres: string[];
  form: FormGroup;

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(GENRES_STREAM) private $genresStream: BehaviorSubject<string[]>,
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$genresStream.subscribe((genres) => {
      if (!genres) return;
      this.genres = [...genres];
    });

    this.subscriptions[1] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        if (this.submitBtnClicked && !isLoading) this.formProcessingEnd.emit();
      });

    this.initForm();
  }

  private initForm(): void {
    const seatPriceValidators = [Validators.required, Validators.min(0)];
    const releaseDate = this.movieContext
      ? this.movieContext.releaseDate
      : new Date(Date.parse('01.01.1995'));

    this.form = new FormGroup({
      name: new FormControl(this.movieContext?.name, Validators.required),
      description: new FormControl(
        this.movieContext?.description,
        Validators.required
      ),
      imageUrl: new FormControl(this.movieContext?.imageUrl, [
        Validators.required,
        Validators.pattern(
          /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/
        ),
      ]),
      genre: new FormControl(this.movieContext?.genre, Validators.required),
      releaseDate: new FormControl(
        formatDate(releaseDate, 'yyyy-MM-dd', 'en'),
        Validators.required
      ),
      seatPriceFields: new FormGroup({
        basicSeatPrice: new FormControl(
          this.movieContext?.basicSeatPrice,
          seatPriceValidators
        ),
        silverSeatPrice: new FormControl(
          this.movieContext?.silverSeatPrice,
          seatPriceValidators
        ),
        goldSeatPrice: new FormControl(
          this.movieContext?.goldSeatPrice,
          seatPriceValidators
        ),
      }),
    });
  }

  setGenre(genre: string): void {
    this.form.value.genre = genre;
  }

  onSelectFieldClicked(): void {
    this.isSelectFieldClicked = true;
  }

  onSubmit(): void {
    this.submitBtnClicked = true;
    if (!this.form.valid) return;

    const movie: Movie & { seatPriceFields: object } = {
      id: this.movieContext?.id,
      ...this.form.value,
      ...this.form.get('seatPriceFields').value,
    };
    delete movie.seatPriceFields;

    this.dataRepositoryService.saveMovie(movie, this.$isLoadingStream);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
