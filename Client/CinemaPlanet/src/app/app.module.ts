import { SharedModule } from './shared/shared.module';
import { initUserAtAppStart } from './infastructure/dependency_providers/appInitializers.provider';
import { userStreamProvider } from './infastructure/dependency_providers/userStream.provider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './admin/main/main/main.component';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([]),
  ],
  providers: [initUserAtAppStart, userStreamProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
