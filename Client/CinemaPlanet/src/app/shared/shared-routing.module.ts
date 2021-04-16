import { MainGuardService } from '../services/route_guards/mainGuard.service';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [MainGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
