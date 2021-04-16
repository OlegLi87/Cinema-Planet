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
    private $overallStatStream: BehaviorSubject<OverallStat>
  ) {}

  streamOverallStat(): void {
    this.httpAdminService.getOverallStatistics().subscribe((data) => {
      this.$overallStatStream.next(data);
    });
  }
}
