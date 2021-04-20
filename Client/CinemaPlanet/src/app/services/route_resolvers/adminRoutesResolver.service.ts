// import { DataRepositoryService } from '../dataRepository.service';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminRoutesResolverService implements Resolve<void> {
//   constructor(private dataRepositoryService: DataRepositoryService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): void | Promise<void> {
//     const url = state.url.toLowerCase();

//     if (url === '/admin') this.dataRepositoryService.streamOverallStat();
//     else if (url.includes('auditoriums'))
//       this.dataRepositoryService.streamAuditoriums();
//   }
// }
