import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() message: string;
  @Output() answerReady = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onClick(result: boolean): void {
    this.answerReady.emit(result);
  }
}
