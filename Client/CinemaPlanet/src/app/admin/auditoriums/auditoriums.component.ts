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

  showForm = false;
  selectedAuditorium: Auditorium;

  constructor(
    @Inject(AUDITORIUMS_STREAM)
    private $auditoriumsStream: BehaviorSubject<Auditorium[]>
  ) {}

  ngOnInit(): void {
    this.subscription = this.$auditoriumsStream.subscribe((audit) => {
      if (!audit) return;
      audit.forEach((a) => this.auditoriums.push({ ...a }));
    });
  }

  toggleShowForm(auditorium: Auditorium) {
    this.showForm = !this.showForm;
    this.selectedAuditorium = auditorium;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
