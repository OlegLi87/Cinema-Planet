import { Order } from './../../../models/domain_models/order.model';
import { BehaviorSubject } from 'rxjs';
import { InjectionToken, Provider } from '@angular/core';

export const ORDERS_STREAM = new InjectionToken('Stream of user orders');

function getOrdersStream(): BehaviorSubject<Order[]> {
  return new BehaviorSubject(null);
}

export const ordersStreamProvider: Provider = {
  provide: ORDERS_STREAM,
  useFactory: getOrdersStream,
};
