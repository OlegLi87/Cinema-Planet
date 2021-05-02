import { DataRepositoryService } from './../services/dataRepository.service';
import { MOVIES_STREAM } from './../services/dependency_providers/moviesStream.provider';
import { distinctUntilChanged } from 'rxjs/operators';
import { IS_LOADING_STREAM } from 'src/app/infastructure/dependency_providers/isLoadingStream.provider';
import { isLoadingStreamProvider } from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/domain_models/movie.model';

@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class UserMainComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();

  movies: Movie[];
  isLoading = false;
  showForm = false;
  selectedMovie: Movie;

  constructor(
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>,
    @Inject(MOVIES_STREAM) private $moviesStream: BehaviorSubject<Movie[]>,
    private dataRepositoryService: DataRepositoryService
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.subscriptions[1] = this.$moviesStream.subscribe((movies) => {
      if (!movies)
        return this.dataRepositoryService.streamMovies(this.$isLoadingStream);

      this.movies = [];
      movies.forEach((m) => this.movies.push({ ...m }));
    });
  }

  onOrderBtnClicked(selectedMovie: Movie): void {
    this.selectedMovie = selectedMovie;
    this.showForm = true;
  }

  movieIdentity(index: number, movie: Movie): number {
    return movie.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
