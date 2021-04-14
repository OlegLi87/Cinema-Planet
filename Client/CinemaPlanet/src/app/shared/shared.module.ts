import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BirthDateDirective } from './form_control_validators/birth-date.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoginComponent, BirthDateDirective, LoadingSpinnerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [],
})
export class SharedModule {}
