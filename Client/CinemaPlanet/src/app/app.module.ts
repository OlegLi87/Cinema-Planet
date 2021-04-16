import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { initUserAtAppStart } from './infastructure/dependency_providers/appInitializers.provider';
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
  providers: [initUserAtAppStart, userStreamProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
