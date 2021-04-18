import { Auditorium } from './../models/domain_models/auditorium.model';
import { AUDITORIUMS_STREAM } from './../infastructure/dependency_providers/auditoriumsStream.provider';
import { OverallStat } from './../models/domain_models/overallStat.model';
import { BehaviorSubject } from 'rxjs';
import { OVERALL_STAT_STREAM } from './../infastructure/dependency_providers/overallStatStream.provider';
import { Inject, Injectable } from '@angular/core';
import { HttpAdminService } from './http_services/httpAdmin.service';
import { IS_LOADING_DATA_STREAM } from '../infastructure/dependency_providers/isLoadingDataStream.provider';

@Injectable({ providedIn: 'root' })
export class DataRepositoryService {
  private notEligibleForStream = new Set<object>();

  constructor(
    private httpAdminService: HttpAdminService,
    @Inject(IS_LOADING_DATA_STREAM)
    private $isLoadingDataStream: BehaviorSubject<boolean>,
    @Inject(OVERALL_STAT_STREAM)
    private $overallStatStream: BehaviorSubject<OverallStat>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>
  ) {}

  streamOverallStat(): void {
    if (this.notEligibleForStream.has(this.$overallStatStream)) return;

    this.$isLoadingDataStream.next(true);
    this.httpAdminService.getOverallStatistics().subscribe((data) => {
      this.$overallStatStream.next(data);
      this.notEligibleForStream.add(this.$overallStatStream);
      this.$isLoadingDataStream.next(false);
    });
  }

  streamAuditoriums(): void {
    if (this.notEligibleForStream.has(this.$auditoriumsStream)) return;

    this.$isLoadingDataStream.next(true);
    this.httpAdminService.getAuditoriums().subscribe((data) => {
      this.$auditoriumsStream.next(data);
      this.notEligibleForStream.add(this.$auditoriumsStream);
      this.$isLoadingDataStream.next(false);
    });
  }
}
