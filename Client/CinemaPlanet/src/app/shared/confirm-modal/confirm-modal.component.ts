import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() message: string;
  @Output() confirmModalClosed = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onBtnClick(result: boolean): void {
    this.confirmModalClosed.emit(result);
  }
}
