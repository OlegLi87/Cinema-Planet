import { MainGuardService } from '../services/route_guards/mainGuard.service';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [MainGuardService] },
];
