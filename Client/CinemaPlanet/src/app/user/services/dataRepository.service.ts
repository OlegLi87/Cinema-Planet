import { Order } from './../../models/domain_models/order.model';
import { AppUtilsService } from './../../services/appUtils.service';
import { Movie } from './../../models/domain_models/movie.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { MOVIES_STREAM } from './dependency_providers/moviesStream.provider';
import { HttpDataService } from './http_services/httpData.service';
import { inject, Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MovieSession } from 'src/app/models/domain_models/movieSession.model';
import { ORDERS_STREAM } from './dependency_providers/ordersStream.provider';

@Injectable()
export class DataRepositoryService {
  constructor(
    private httpDataService: HttpDataService,
    private appUtilsService: AppUtilsService,
    @Inject(MOVIES_STREAM) private $moviesStream: BehaviorSubject<Movie[]>,
    @Inject(ORDERS_STREAM) private $ordersstream: BehaviorSubject<Order[]>
  ) {}

  streamMovies($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService
      .getMovies()
      .pipe(
        map<any[], Movie[]>((data) =>
          data.map<Movie>(this.appUtilsService.mapToLowerCase)
        ),
        map((movies) =>
          movies.map((movie) => {
            movie.releaseDate = this.appUtilsService.mapToDate(
              movie.releaseDate
            );
            return movie;
          })
        )
      )
      .subscribe((movies) => {
        this.$moviesStream.next(movies);
        $isLoadingStream?.next(false);
      });
  }

  streamAvailableMovieSessions(
    movieId: number,
    $availableMovieSessionsStream: Subject<MovieSession[]>
  ): void {
    this.httpDataService
      .getAvailableMovieSessions(movieId)
      .pipe(
        map<any[], MovieSession[]>((data) =>
          data.map<MovieSession>(this.appUtilsService.mapToLowerCase)
        ),
        map((movieSessions) =>
          movieSessions.map((ms) => {
            ms.sessionDate = this.appUtilsService.mapToDate(ms.sessionDate);
            return ms;
          })
        )
      )
      .subscribe((movieSessions) => {
        $availableMovieSessionsStream.next(movieSessions);
      });
  }

  streamAvailableSeatTypes(
    movieSessionId: number,
    $availableSeatTypesStream: Subject<string[]>
  ): void {
    this.httpDataService
      .getAvailableSeatTypes(movieSessionId)
      .subscribe((seatTypes) => $availableSeatTypesStream.next(seatTypes));
  }

  streamOrders($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService
      .getOrders()
      .pipe(
        map<any[], Order[]>((data) =>
          data.map<Order>(this.appUtilsService.mapToLowerCase)
        ),
        map((orders) =>
          orders.map((order) => {
            order.sessionDate = this.appUtilsService.mapToDate(
              order.sessionDate
            );
            return order;
          })
        )
      )
      .subscribe((orders) => {
        console.log(orders);
        this.$ordersstream.next(orders);
        $isLoadingStream?.next(false);
      });
  }

  saveOrder(order: Order, $isLoadingStream?: Subject<boolean>) {
    $isLoadingStream?.next(true);

    this.httpDataService.saveOrder(order).subscribe((any) => {
      $isLoadingStream.next(false);
      this.streamOrders();
    });
  }
}
