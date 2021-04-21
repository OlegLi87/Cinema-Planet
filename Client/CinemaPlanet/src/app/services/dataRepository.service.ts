import { Auditorium } from './../models/domain_models/auditorium.model';
import { AUDITORIUMS_STREAM } from './../infastructure/dependency_providers/auditoriumsStream.provider';
import { OverallStat } from './../models/domain_models/overallStat.model';
import { BehaviorSubject } from 'rxjs';
import { OVERALL_STAT_STREAM } from './../infastructure/dependency_providers/overallStatStream.provider';
import { Inject, Injectable } from '@angular/core';
import { HttpAdminService } from './http_services/httpAdmin.service';

@Injectable({ providedIn: 'root' })
export class DataRepositoryService {
  constructor(
    private httpAdminService: HttpAdminService,
    @Inject(OVERALL_STAT_STREAM)
    private $overallStatStream: BehaviorSubject<OverallStat>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>
  ) {}

  streamOverallStat($isLoadingStream?: BehaviorSubject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpAdminService.getOverallStatistics().subscribe((data) => {
      this.$overallStatStream.next(data);
      $isLoadingStream?.next(false);
    });
  }

  streamAuditoriums($isLoadingStream?: BehaviorSubject<boolean>): void {
    $isLoadingStream?.next(true);

    this.httpAdminService.getAuditoriums().subscribe((data) => {
      this.$auditoriumsStream.next(data);
      $isLoadingStream?.next(false);
    });
  }

  saveAuditorium(
    auditorium: Auditorium,
    $isLoadingStream?: BehaviorSubject<boolean>
  ): void {
    $isLoadingStream?.next(true);
    this.httpAdminService.saveAuditorium(auditorium).subscribe((data) => {
      $isLoadingStream?.next(false);
      this.streamAuditoriums($isLoadingStream);
      if (!auditorium.id) this.streamOverallStat();
    });
  }

  deleteAuditoirum(
    id: number,
    $isLoadingStream?: BehaviorSubject<boolean>
  ): void {
    $isLoadingStream?.next(true);
    this.httpAdminService.deleteAuditorium(id).subscribe(() => {
      this.streamOverallStat();
      this.streamAuditoriums($isLoadingStream);
    });
  }
}
