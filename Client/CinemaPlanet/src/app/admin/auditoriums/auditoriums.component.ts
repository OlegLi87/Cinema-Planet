import { FormContext } from './../form-container/form-container.component';
import { DataRepositoryService } from './../../services/dataRepository.service';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AUDITORIUMS_STREAM } from './../../infastructure/dependency_providers/auditoriumsStream.provider';
import { Auditorium } from './../../models/domain_models/auditorium.model';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'auditoriums',
  templateUrl: './auditoriums.component.html',
  styleUrls: ['./auditoriums.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class AuditoriumsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  auditoriums: Auditorium[];
  isLoading = false;
  showForm = false;

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM)
    private $isLoadingStream: BehaviorSubject<boolean>,
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.subscriptions[1] = this.$auditoriumsStream.subscribe((audit) => {
      if (!audit)
        return this.dataRepositoryService.streamAuditoriums(
          this.$isLoadingStream
        );

      this.auditoriums = [];
      audit.forEach((a) => this.auditoriums.push({ ...a }));
      this.showForm = false;
    });
  }

  toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  getFormContext(): FormContext {
    return {
      contextObj: null,
      contextName: 'auditorium',
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
