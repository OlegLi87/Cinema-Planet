import { distinctUntilChanged } from 'rxjs/operators';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../../infastructure/dependency_providers/isLoadingStream.provider';
import { Subject, Subscription } from 'rxjs';
import { DataRepositoryService } from './../../../services/dataRepository.service';
import { Auditorium } from './../../../models/domain_models/auditorium.model';
import {
  Component,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auditorium-form',
  templateUrl: './auditorium-form.component.html',
  styleUrls: ['./auditorium-form.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class AuditoriumFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input() auditoriumContext: Auditorium;
  @Output() formProcessingEnd = new EventEmitter<void>();
  form: FormGroup;
  submitBtnClicked = false;
  isLoading = false;

  constructor(
    private dataRepository: DataRepositoryService,
    @Inject(IS_LOADING_STREAM)
    private $isLoadingStream: Subject<boolean>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        if (this.submitBtnClicked && !isLoading) this.formProcessingEnd.emit();
      });
  }

  private initForm(): void {
    const numberInputValidators = [
      Validators.required,
      Validators.min(0),
      Validators.max(255),
    ];

    this.form = new FormGroup({
      name: new FormControl(this.auditoriumContext?.name, Validators.required),
      imageUrl: new FormControl(this.auditoriumContext?.imageUrl, [
        Validators.required,
        Validators.pattern(
          /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/
        ),
      ]),
      numericalInputs: new FormGroup({
        basicSeatsCapacity: new FormControl(
          this.auditoriumContext?.basicSeatsCapacity,
          numberInputValidators
        ),
        silverSeatsCapacity: new FormControl(
          this.auditoriumContext?.silverSeatsCapacity,
          numberInputValidators
        ),
        goldSeatsCapacity: new FormControl(
          this.auditoriumContext?.goldSeatsCapacity,
          numberInputValidators
        ),
      }),
    });
  }

  onSubmit(): void {
    this.submitBtnClicked = true;
    if (!this.form.valid) return;

    this.dataRepository.saveAuditorium(
      {
        id: this.auditoriumContext?.id,
        name: this.form.value.name,
        imageUrl: this.form.value.imageUrl,
        ...this.form.value.numericalInputs,
      },
      this.$isLoadingStream
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
