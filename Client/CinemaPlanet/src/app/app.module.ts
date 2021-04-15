import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { initUserAtAppStart } from './infastructure/dependency_providers/appInitializers.provider';
import { userStreamProvider } from './infastructure/dependency_providers/userStream.provider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule,
    AdminModule,
  ],
  providers: [initUserAtAppStart, userStreamProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
