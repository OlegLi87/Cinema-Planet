import { MOVIE_SESSIONS_STREAM } from './dependency_providers/movieSessionsStream.povider';
import { OVERALL_STAT_STREAM } from './dependency_providers/overallStatStream.provider';
import { AUDITORIUMS_STREAM } from './dependency_providers/auditoriumsStream.provider';
import { MOVIES_STREAM } from './dependency_providers/moviesStream.provider';
import { HttpDataService } from './http_services/httpData.service';
import { Movie } from '../../models/domain_models/movie.model';
import { Auditorium } from '../../models/domain_models/auditorium.model';
import { OverallStat } from '../../models/domain_models/overallStat.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GENRES_STREAM } from './dependency_providers/genresStream.provider';
import { MovieSession } from '../../models/domain_models/movieSession.model';

@Injectable()
export class DataRepositoryService {
  constructor(
    private httpDataService: HttpDataService,
    @Inject(OVERALL_STAT_STREAM)
    private $overallStatStream: BehaviorSubject<OverallStat>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>,
    @Inject(MOVIES_STREAM)
    private $moviesStream: BehaviorSubject<Movie[]>,
    @Inject(GENRES_STREAM) private $genresStream: BehaviorSubject<string[]>,
    @Inject(MOVIE_SESSIONS_STREAM)
    private $movieSessionsStream: BehaviorSubject<MovieSession[]>
  ) {}

  streamOverallStat($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService
      .getOverallStatistics()
      .pipe(map<any, OverallStat>(this.mapToLowerCase))
      .subscribe((data) => {
        this.$overallStatStream.next(data);
        $isLoadingStream?.next(false);
      });
  }

  streamAuditoriums($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService
      .getAuditoriums()
      .pipe(map((data) => data.map<Auditorium>(this.mapToLowerCase)))
      .subscribe((data) => {
        this.$auditoriumsStream.next(data);
        $isLoadingStream?.next(false);
      });
  }

  streamMovies($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService
      .getMovies()
      .pipe(
        map((data) => data.map<Movie>(this.mapToLowerCase)),
        map((data) => {
          return data.map((movie) => {
            movie.releaseDate = this.mapToDate(movie.releaseDate);
            return movie;
          });
        })
      )
      .subscribe((data) => {
        this.$moviesStream.next(data);
        $isLoadingStream?.next(false);
      });

    this.httpDataService
      .getGenres()
      .subscribe((data) => this.$genresStream.next(data));
  }

  streamMovieSessions($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService
      .getMovieSessions()
      .pipe(
        map((data) => data.map<MovieSession>(this.mapToLowerCase)),
        map((data) =>
          data.map((ms) => {
            ms.sessionDate = this.mapToDate(ms.sessionDate);
            return ms;
          })
        )
      )
      .subscribe((data) => {
        this.$movieSessionsStream.next(data);
        $isLoadingStream?.next(false);
      });
  }

  saveAuditorium(
    auditorium: Auditorium,
    $isLoadingStream?: Subject<boolean>
  ): void {
    $isLoadingStream?.next(true);

    this.httpDataService.saveAuditorium(auditorium).subscribe((data) => {
      if (!auditorium.id) this.streamOverallStat();
      this.streamAuditoriums($isLoadingStream);
    });
  }

  saveMovie(movie: Movie, $isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService.saveMovie(movie).subscribe((data) => {
      if (!movie.id) this.streamOverallStat();
      this.streamMovies($isLoadingStream);
    });
  }

  saveMovieSession(
    movieSession: MovieSession,
    $isLoadingStream?: Subject<boolean>
  ): void {
    $isLoadingStream?.next(true);

    this.httpDataService.saveMovieSession(movieSession).subscribe((data) => {
      if (!movieSession.id) {
        this.streamOverallStat();
      }
      this.streamAuditoriums();
      this.streamMovies();
      this.streamMovieSessions($isLoadingStream);
    });
  }

  deleteAuditoirum(id: number, $isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);
    this.httpDataService.deleteAuditorium(id).subscribe(() => {
      this.streamOverallStat();
      this.streamMovieSessions();
      this.streamAuditoriums($isLoadingStream);
    });
  }

  deleteMovie(id: number, $isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService.deleteMovie(id).subscribe(() => {
      this.streamOverallStat();
      this.streamMovieSessions();
      this.streamMovies($isLoadingStream);
    });
  }

  deleteMovieSession(id: number, $isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpDataService.deleteMovieSession(id).subscribe(() => {
      this.streamOverallStat();
      this.streamAuditoriums();
      this.streamMovies();
      this.streamMovieSessions($isLoadingStream);
    });
  }

  private mapToLowerCase<T>(dataObj: object): T {
    if (!dataObj) return;
    const keys = Object.keys(dataObj);
    const result = {} as T;

    keys.forEach((k) => {
      const keyStartWithLower = k[0].toLowerCase() + k.substring(1);
      result[keyStartWithLower] = dataObj[k];
    });
    return result;
  }

  private mapToDate(dateStr: any): Date {
    return new Date(Date.parse(dateStr));
  }
}
