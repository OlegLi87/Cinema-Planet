import { movieSessionsStreamProvider } from './infastructure/dependency_providers/movieSessionsStream.povider';
import { genresStreamProvider } from './infastructure/dependency_providers/genresStream.provider';
import { moviesStreamProvider } from './infastructure/dependency_providers/moviesStream.provider';
import { auditoriumsStreamProvider } from './infastructure/dependency_providers/auditoriumsStream.provider';
import { overallStatStreamProvider } from './infastructure/dependency_providers/overallStatStream.provider';
import { httpInterceptorProvider } from './infastructure/dependency_providers/httpInterceptor.provider';
import { AppRoutingModule } from './app-routing.module';
import { initUserAtAppStartProvider } from './infastructure/dependency_providers/appInitializers.provider';
import { userStreamProvider } from './infastructure/dependency_providers/userStream.provider';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-Ru' },
    initUserAtAppStartProvider,
    httpInterceptorProvider,
    userStreamProvider,
    overallStatStreamProvider,
    auditoriumsStreamProvider,
    moviesStreamProvider,
    genresStreamProvider,
    movieSessionsStreamProvider,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
