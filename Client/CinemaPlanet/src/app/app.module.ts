import { initUserAtAppStart } from './infastructure/dependency_providers/appInitializers.provider';
import { userStreamProvider } from './infastructure/dependency_providers/userStream.provider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [initUserAtAppStart, userStreamProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
