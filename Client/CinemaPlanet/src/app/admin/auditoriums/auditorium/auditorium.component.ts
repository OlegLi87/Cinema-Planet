import { Auditorium } from './../../../models/domain_models/auditorium.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'auditorium',
  templateUrl: './auditorium.component.html',
  styleUrls: ['./auditorium.component.sass'],
})
export class AuditoriumComponent implements OnInit {
  @Input() auditorium: Auditorium;
  @Output() editBtnClicked = new EventEmitter<Auditorium>();

  constructor() {}

  ngOnInit(): void {}

  onEditBtnClick(): void {
    this.editBtnClicked.next(this.auditorium);
  }
}
