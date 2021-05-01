import { distinctUntilChanged } from 'rxjs/operators';
import { IS_LOADING_STREAM } from 'src/app/infastructure/dependency_providers/isLoadingStream.provider';
import { isLoadingStreamProvider } from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, Inject, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/domain_models/movie.model';

@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class UserMainComponent implements OnInit {
  private subscriptions = new Array<Subscription>();

  movies: Movie[];
  isLoading = false;

  constructor(
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));

    // this.subscriptions[1] = this.$moviesStream.subscribe((movies) => {
    //   if (!movies)
    //     return this.dataRepositoryService.streamMovies(this.$isLoadingStream);

    //   this.movies = [];
    //   movies.forEach((m) => this.movies.push({ ...m }));
    // });
  }

  movieIdentity(index: number, movie: Movie): number {
    return movie.id;
  }
}
