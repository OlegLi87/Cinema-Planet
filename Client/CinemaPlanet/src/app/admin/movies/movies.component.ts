import { FormContext } from './../form-container/form-container.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { IS_LOADING_STREAM } from 'src/app/infastructure/dependency_providers/isLoadingStream.provider';
import { Movie } from './../../models/domain_models/movie.model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { DataRepositoryService } from './../../services/dataRepository.service';
import { isLoadingStreamProvider } from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MOVIES_STREAM } from 'src/app/infastructure/dependency_providers/moviesStream.provider';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MoviesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  movies: Movie[];
  isLoading = false;
  showForm = false;

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(MOVIES_STREAM) private $moviesStream: BehaviorSubject<Movie[]>,
    @Inject(IS_LOADING_STREAM) private $isLoadingStream: Subject<boolean>
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

  toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  get formContext(): FormContext {
    return {
      contextObj: null,
      contextName: 'movie',
    };
  }

  movieIdentity(index: number, movie: Movie): number {
    return movie.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
