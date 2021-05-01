import { OVERALL_STAT_STREAM } from './../services/dependency_providers/overallStatStream.provider';
import { DataRepositoryService } from '../services/dataRepository.service';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { OverallStat } from './../../models/domain_models/overallStat.model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class AdminMainComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  isOnAdminMainRoute = true;
  childComponentHeader: string;
  isLoading: boolean;
  overallStat: OverallStat;

  constructor(
    private router: Router,
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM)
    private $isLoadingStream: Subject<boolean>,
    @Inject(OVERALL_STAT_STREAM)
    private $overallStatStream: BehaviorSubject<OverallStat>
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.toLocaleLowerCase() === '/admin') {
          this.isOnAdminMainRoute = true;
          return;
        }
        this.setChildComponentHeader(e.url);
        this.isOnAdminMainRoute = false;
      }
    });

    this.subscriptions[1] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });

    this.subscriptions[2] = this.$overallStatStream.subscribe((stat) => {
      if (!stat)
        return this.dataRepositoryService.streamOverallStat(
          this.$isLoadingStream
        );
      if ($.isEmptyObject(stat)) return;
      this.overallStat = { ...stat };
    });
  }

  getOverallStatKeys(): string[] {
    if (this.overallStat) return Object.keys(this.overallStat);
    return [];
  }

  private setChildComponentHeader(url: string): void {
    switch (url.toLocaleLowerCase()) {
      case '/admin/auditoriums': {
        this.childComponentHeader = 'Auditoriums';
        break;
      }
      case '/admin/movies': {
        this.childComponentHeader = 'Movies';
        break;
      }
      case '/admin/moviesessions': {
        this.childComponentHeader = 'Movie Sessions';
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sbs) => sbs.unsubscribe());
  }
}
