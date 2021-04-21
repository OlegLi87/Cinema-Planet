import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface FormContext {
  contextObj: { id: number };
  contextName: string;
}

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.sass'],
})
export class FormContainerComponent implements OnInit {
  @Input() formContext: FormContext;
  @Output() formClosed = new EventEmitter<void>();
  @HostBinding('class.slideOut') slideOut = false;
  @HostListener('animationend')
  animationEnd(): void {
    if (this.slideOut) this.formClosed.emit();
  }

  stripText: string;

  constructor() {}

  ngOnInit(): void {
    this.stripText = this.formContext.contextObj ? 'edit form' : 'new form';
  }

  onClose(): void {
    this.slideOut = true;
  }
}
