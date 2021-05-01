import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MainGuardService } from './services/route_guards/mainGuard.service';
import { LoginComponent } from './shared/login/login.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MainGuardService],
  },
  {
    path: 'admin',
    canActivate: [MainGuardService],
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'app',
    canActivate: [MainGuardService],
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
