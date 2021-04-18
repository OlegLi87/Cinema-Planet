import { isLoadingDataStreamProvider } from './infastructure/dependency_providers/isLoadingDataStream.provider';
import { auditoriumsStreamProvider } from './infastructure/dependency_providers/auditoriumsStream.provider';
import { overallStatStreamProvider } from './infastructure/dependency_providers/overallStatStream.provider';
import { httpInterceptorProvider } from './infastructure/dependency_providers/httpInterceptor.provider';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { initUserAtAppStartProvider } from './infastructure/dependency_providers/appInitializers.provider';
import { userStreamProvider } from './infastructure/dependency_providers/userStream.provider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    initUserAtAppStartProvider,
    httpInterceptorProvider,
    userStreamProvider,
    isLoadingDataStreamProvider,
    overallStatStreamProvider,
    auditoriumsStreamProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
