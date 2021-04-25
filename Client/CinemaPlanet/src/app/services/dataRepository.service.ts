import { Movie } from './../models/domain_models/movie.model';
import { Auditorium } from './../models/domain_models/auditorium.model';
import { AUDITORIUMS_STREAM } from './../infastructure/dependency_providers/auditoriumsStream.provider';
import { OverallStat } from './../models/domain_models/overallStat.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { OVERALL_STAT_STREAM } from './../infastructure/dependency_providers/overallStatStream.provider';
import { Inject, Injectable } from '@angular/core';
import { HttpAdminService } from './http_services/httpAdmin.service';
import { MOVIES_STREAM } from '../infastructure/dependency_providers/moviesStream.provider';
import { map } from 'rxjs/operators';
import { GENRES_STREAM } from '../infastructure/dependency_providers/genresStream.provider';

@Injectable({ providedIn: 'root' })
export class DataRepositoryService {
  constructor(
    private httpAdminService: HttpAdminService,
    @Inject(OVERALL_STAT_STREAM)
    private $overallStatStream: BehaviorSubject<OverallStat>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>,
    @Inject(MOVIES_STREAM)
    private $moviesStream: BehaviorSubject<Movie[]>,
    @Inject(GENRES_STREAM) private $genresStream: BehaviorSubject<string[]>
  ) {}

  streamOverallStat($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpAdminService
      .getOverallStatistics()
      .pipe(map<any, OverallStat>(this.mapToLowerCase))
      .subscribe((data) => {
        this.$overallStatStream.next(data);
        $isLoadingStream?.next(false);
      });
  }

  streamAuditoriums($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpAdminService
      .getAuditoriums()
      .pipe(map((data) => data.map<Auditorium>(this.mapToLowerCase)))
      .subscribe((data) => {
        this.$auditoriumsStream.next(data);
        $isLoadingStream?.next(false);
      });
  }

  streamMovies($isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpAdminService
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
        $isLoadingStream.next(false);
      });

    this.httpAdminService
      .getGenres()
      .subscribe((data) => this.$genresStream.next(data));
  }

  saveAuditorium(
    auditorium: Auditorium,
    $isLoadingStream?: Subject<boolean>
  ): void {
    $isLoadingStream?.next(true);

    this.httpAdminService
      .saveAuditorium(auditorium)
      .pipe(map<any, Auditorium>(this.mapToLowerCase))
      .subscribe((data) => {
        this.streamAuditoriums($isLoadingStream);
        if (!auditorium.id) this.streamOverallStat();
      });
  }

  deleteAuditoirum(id: number, $isLoadingStream?: Subject<boolean>): void {
    $isLoadingStream?.next(true);
    this.httpAdminService.deleteAuditorium(id).subscribe(() => {
      this.streamOverallStat();
      this.streamAuditoriums($isLoadingStream);
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

  mapToDate(dateStr: any): Date {
    return new Date(Date.parse(dateStr));
  }
}
