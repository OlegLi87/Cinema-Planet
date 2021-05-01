import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { UserMainComponent } from './user-main/user-main.component';
import { OrdersComponent } from './orders/orders.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserMainComponent, OrdersComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
