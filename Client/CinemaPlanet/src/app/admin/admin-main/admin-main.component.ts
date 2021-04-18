import { IS_LOADING_DATA_STREAM } from './../../infastructure/dependency_providers/isLoadingDataStream.provider';
import { OverallStat } from './../../models/domain_models/overallStat.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OVERALL_STAT_STREAM } from 'src/app/infastructure/dependency_providers/overallStatStream.provider';

declare const $: any;

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.sass'],
})
export class AdminMainComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  isOnAdminMainRoute = true;
  childComponentHeader: string;
  isLoading: boolean;
  overallStat: OverallStat;

  constructor(
    private router: Router,
    @Inject(IS_LOADING_DATA_STREAM)
    private $isLoadingDataStream: BehaviorSubject<boolean>,
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

    this.subscriptions[1] = this.$isLoadingDataStream.subscribe((isLoading) => {
      if (isLoading === null) return;
      this.isLoading = isLoading;
    });

    this.subscriptions[2] = this.$overallStatStream.subscribe((stat) => {
      if (stat === null || $.isEmptyObject(stat)) return;

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