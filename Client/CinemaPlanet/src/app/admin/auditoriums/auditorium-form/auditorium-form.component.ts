import { Auditorium } from './../../../models/domain_models/auditorium.model';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileCheck } from 'angular-file-validator';

@Component({
  selector: 'auditorium-form',
  templateUrl: './auditorium-form.component.html',
  styleUrls: ['./auditorium-form.component.sass'],
})
export class AuditoriumFormComponent implements OnInit {
  @Input() auditoriumContext: Auditorium;
  @Output() formClosed = new EventEmitter<void>();

  @HostBinding('class.slideOut') slideOut = false;
  @HostListener('animationend')
  animationEnd(): void {
    if (this.slideOut) this.formClosed.next();
  }

  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const numberInputValidators = [
      Validators.required,
      Validators.min(0),
      Validators.max(255),
    ];

    this.form = new FormGroup({
      name: new FormControl(this.auditoriumContext?.name, Validators.required),
      imageUrl: new FormControl(this.auditoriumContext?.imageUrl, {
        validators: Validators.required,
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg', 'jpg'])],
      }),
      numericalInputs: new FormGroup({
        basicSeats: new FormControl(
          this.auditoriumContext?.basicSeatsCapacity,
          numberInputValidators
        ),
        silverSeats: new FormControl(
          this.auditoriumContext?.silverSeatsCapacity,
          numberInputValidators
        ),
        goldSeats: new FormControl(
          this.auditoriumContext?.goldSeatsCapacity,
          numberInputValidators
        ),
      }),
    });
  }

  onSubmit(): void {
    console.log(this.form);
  }

  onClose(): void {
    this.slideOut = true;
  }
}
