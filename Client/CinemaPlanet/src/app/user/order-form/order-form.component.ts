import { Movie } from './../../models/domain_models/movie.model';
import { MovieSession } from './../../models/domain_models/movieSession.model';
import { DataRepositoryService } from './../services/dataRepository.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Order } from './../../models/domain_models/order.model';
import { Subject, Subscription } from 'rxjs';
import {
  availableSeatTypesStreamProvider,
  AVAILABLE_SEAT_TYPES_STREAM,
} from './../services/dependency_providers/availableSeatTypesStream.provider';
import {
  availableSessionDatesStreamProvider,
  AVAILABLE_MOVIE_SESSIONS_STREAM,
} from '../services/dependency_providers/availableMovieSessionsStream.provider';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
  providers: [
    isLoadingStreamProvider,
    availableSessionDatesStreamProvider,
    availableSeatTypesStreamProvider,
  ],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  @Input() movie: Movie;

  private subscriptions = new Array<Subscription>();
  private selectedMovieSessionId: number;

  order: Order = {} as Order;
  availableMovieSessions: MovieSession[];
  availableSeatTypes: string[];
  isLoading = false;

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>,
    @Inject(AVAILABLE_MOVIE_SESSIONS_STREAM)
    private $availableMovieSessionStream: Subject<MovieSession[]>,
    @Inject(AVAILABLE_SEAT_TYPES_STREAM)
    private $availableSeatTypesStream: Subject<string[]>
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.subscriptions[1] = this.$availableMovieSessionStream.subscribe(
      (movieSessions) => {
        this.availableMovieSessions = [];
        movieSessions.forEach((ms) =>
          this.availableMovieSessions.push({ ...ms })
        );
        this.onDateSelectionChanged(this.availableMovieSessions[0].id);
        this.isLoading = false;
      }
    );

    this.subscriptions[2] = this.$availableSeatTypesStream.subscribe(
      (seatTypes) => {
        this.availableSeatTypes = seatTypes;
        this.isLoading = false;
      }
    );
  }

  onDateSelectionClicked(): void {
    if (this.availableMovieSessions) return;

    this.isLoading = true;
    this.dataRepositoryService.streamAvailableMovieSessions(
      this.movie.id,
      this.$availableMovieSessionStream
    );
  }

  onDateSelectionChanged(movieSessionId: number): void {
    this.isLoading = true;
    this.selectedMovieSessionId = movieSessionId;

    this.dataRepositoryService.streamAvailableSeatTypes(
      movieSessionId,
      this.$availableSeatTypesStream
    );
  }

  get price(): number {
    switch (this.order.seatType) {
      case 'Basic': {
        return this.movie.basicSeatPrice;
      }
      case 'Silver': {
        return this.movie.silverSeatPrice;
      }
      case 'Gold': {
        return this.movie.goldSeatPrice;
      }
      default: {
        return 0;
      }
    }
  }

  onSubmit(): void {
    this.order.movieSessionId = this.selectedMovieSessionId;
    this.dataRepositoryService.saveOrder(this.order, this.$isLoadingStream);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
