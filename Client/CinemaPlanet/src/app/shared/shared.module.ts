import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [LoginComponent],
})
export class SharedModule {}
