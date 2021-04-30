import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BirthDateDirective } from './form_control_validators/birth-date.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CustomCurrencyPipe } from './pipes/customCurrency.pipe';
import { StringTrimmerPipe } from './pipes/stringTrimmer.pipe';
import { PropertyNameCorrectorPipe } from './pipes/propertyNameCorrector.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    BirthDateDirective,
    LoadingSpinnerComponent,
    NavigationBarComponent,
    NotFoundComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    ConfirmModalComponent,
    PropertyNameCorrectorPipe,
    CustomCurrencyPipe,
    StringTrimmerPipe,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    NavigationBarComponent,
    LoadingSpinnerComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    ConfirmModalComponent,
    PropertyNameCorrectorPipe,
    CustomCurrencyPipe,
    StringTrimmerPipe,
  ],
})
export class SharedModule {}
