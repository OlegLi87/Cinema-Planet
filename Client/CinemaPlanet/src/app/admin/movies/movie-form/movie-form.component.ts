import { BehaviorSubject } from 'rxjs';
import { GENRES_STREAM } from './../../../infastructure/dependency_providers/genresStream.provider';
import { Movie } from './../../../models/domain_models/movie.model';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass'],
})
export class MovieFormComponent implements OnInit {
  @Input() movieContext: Movie;
  genres: string[];
  form: FormGroup;

  constructor(
    @Inject(GENRES_STREAM) private $genresStream: BehaviorSubject<string[]>
  ) {}

  ngOnInit(): void {
    this.$genresStream.subscribe((genres) => {
      if (!genres) return;
      this.genres = [...genres];
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
    console.log(this.form);
  }
}
