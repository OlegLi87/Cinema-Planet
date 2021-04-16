import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BirthDateDirective } from './form_control_validators/birth-date.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    LoginComponent,
    BirthDateDirective,
    LoadingSpinnerComponent,
    NavigationBarComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, FormsModule],
  exports: [NavigationBarComponent],
})
export class SharedModule {}
