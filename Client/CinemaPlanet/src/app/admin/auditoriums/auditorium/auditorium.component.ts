import { Auditorium } from './../../../models/domain_models/auditorium.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auditorium',
  templateUrl: './auditorium.component.html',
  styleUrls: ['./auditorium.component.sass'],
})
export class AuditoriumComponent implements OnInit {
  @Input() auditorium: Auditorium;
  constructor() {}

  ngOnInit(): void {}
}
