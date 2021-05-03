import { DataRepositoryService } from './../services/dataRepository.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import {
  IS_LOADING_STREAM,
  isLoadingStreamProvider,
} from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { ORDERS_STREAM } from '../services/dependency_providers/ordersStream.provider';
import { Order } from 'src/app/models/domain_models/order.model';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();

  isLoading = false;
  orders: Order[];

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM)
    private $isLoadingStream: Subject<boolean>,
    @Inject(ORDERS_STREAM) private $ordersStream: BehaviorSubject<Order[]>
  ) {}

  ngOnInit(): void {
    this.subscriptions[0] = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoadng) => (this.isLoading = isLoadng));

    this.subscriptions[1] = this.$ordersStream.subscribe((orders) => {
      if (!orders)
        return this.dataRepositoryService.streamOrders(this.$isLoadingStream);

      this.orders = [];
      orders.forEach((order) => this.orders.push({ ...order }));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
