import { Order } from './../../models/domain_models/order.model';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[seatColor]',
})
export class SeatColorDirective implements OnInit {
  @Input('seatColor') order: Order;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.setColor();
  }

  private setColor(): void {
    let className = '';

    switch (this.order.seatType.toLocaleLowerCase()) {
      case 'basic': {
        className = 'text-info';
        break;
      }
      case 'silver': {
        className = 'text-muted';
        break;
      }
      case 'gold': {
        className = 'text-warning';
        break;
      }
    }

    (this.elRef.nativeElement as HTMLElement).classList.add(className);
  }
}
