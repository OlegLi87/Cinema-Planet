import { DataRepositoryService } from './../dataRepository.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminMainResolverService implements Resolve<void> {
  constructor(private dataRepositoryService: DataRepositoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void | Observable<void> | Promise<void> {
    this.dataRepositoryService.streamOverallStat();
  }
}
