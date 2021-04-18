import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.sass'],
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() backgroundColor: string;
  @Input() circleColor: string;

  @HostBinding('style.background-color') background;

  constructor() {}

  ngOnInit(): void {
    this.background = this.backgroundColor;
  }
}
