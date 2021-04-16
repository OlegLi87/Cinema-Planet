import { OverallStat } from './../../models/domain_models/overallStat.model';
import { BehaviorSubject } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OVERALL_STAT_STREAM } from 'src/app/infastructure/dependency_providers/overallStatStream.provider';

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.sass'],
})
export class AdminMainComponent implements OnInit {
  showStatistics = true;
  overallStat: OverallStat;

  constructor(
    private router: Router,
    @Inject(OVERALL_STAT_STREAM)
    private $overallStatStream: BehaviorSubject<OverallStat>
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/admin') {
          this.showStatistics = true;
          return;
        }
        this.showStatistics = false;
      }
    });

    this.$overallStatStream.subscribe((stat) => (this.overallStat = stat));
  }

  getOverallStatKeys(): string[] {
    if (this.overallStat) return Object.keys(this.overallStat);
    return [];
  }
}
