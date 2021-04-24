import { DataRepositoryService } from './../../services/dataRepository.service';
import { isLoadingStreamProvider } from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class MoviesComponent implements OnInit {
  constructor(private dataRepositoryService: DataRepositoryService) {}

  ngOnInit(): void {
    this.dataRepositoryService.streamMovies();
  }
}
