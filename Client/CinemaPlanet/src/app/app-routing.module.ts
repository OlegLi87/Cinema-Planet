import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
