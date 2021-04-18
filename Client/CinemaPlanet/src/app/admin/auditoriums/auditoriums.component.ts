import { BehaviorSubject, Subscription } from 'rxjs';
import { AUDITORIUMS_STREAM } from './../../infastructure/dependency_providers/auditoriumsStream.provider';
import { Auditorium } from './../../models/domain_models/auditorium.model';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'auditoriums',
  templateUrl: './auditoriums.component.html',
  styleUrls: ['./auditoriums.component.sass'],
})
export class AuditoriumsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  auditoriums: Auditorium[] = [];

  constructor(
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>
  ) {}

  ngOnInit(): void {
    this.subscription = this.$auditoriumsStream.subscribe((audit) => {
      if (!audit) return;
      this.auditoriums = [...audit];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
