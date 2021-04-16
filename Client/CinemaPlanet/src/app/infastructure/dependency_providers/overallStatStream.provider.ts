import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { OverallStat } from '../../models/domain_models/overallStat.model';
import { Provider } from '@angular/core';

export const OVERALL_STAT_STREAM = new InjectionToken(
  'Provider for a stream of overall statistics data'
);

function getOverallStatStream(): BehaviorSubject<OverallStat> {
  return new BehaviorSubject<OverallStat>(null);
}

export const overallStatStreamProvider: Provider = {
  provide: OVERALL_STAT_STREAM,
  useFactory: getOverallStatStream,
};
