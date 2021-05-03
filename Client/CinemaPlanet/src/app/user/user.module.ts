import { ordersStreamProvider } from './services/dependency_providers/ordersStream.provider';
import { FormsModule } from '@angular/forms';
import { DataRepositoryService } from './services/dataRepository.service';
import { moviesStreamProvider } from './services/dependency_providers/moviesStream.provider';
import { HttpDataService } from './services/http_services/httpData.service';
import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { UserMainComponent } from './user-main/user-main.component';
import { OrdersComponent } from './orders/orders.component';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form/order-form.component';
import { SeatColorDirective } from './directives/seat-color.directive';

@NgModule({
  declarations: [UserMainComponent, OrdersComponent, OrderFormComponent, SeatColorDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule, FormsModule],
  providers: [
    HttpDataService,
    DataRepositoryService,
    moviesStreamProvider,
    ordersStreamProvider,
  ],
})
export class UserModule {}
