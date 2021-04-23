import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IS_LOADING_STREAM } from 'src/app/infastructure/dependency_providers/isLoadingStream.provider';
import { DataRepositoryService } from './../../../services/dataRepository.service';
import { isLoadingStreamProvider } from './../../../infastructure/dependency_providers/isLoadingStream.provider';
import { FormContext } from './../../form-container/form-container.component';
import { Auditorium } from './../../../models/domain_models/auditorium.model';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auditorium',
  templateUrl: './auditorium.component.html',
  styleUrls: ['./auditorium.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class AuditoriumComponent implements OnInit {
  @Input() auditorium: Auditorium;

  isLoading = false;
  showForm = false;
  showConfirmModal = false;

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM)
    private $isLoadingStream: BehaviorSubject<boolean>
  ) {}

  ngOnInit(): void {
    this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }

  toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  toggleShowConfirmModal(): void {
    this.showConfirmModal = !this.showConfirmModal;
  }

  confirmModalClosed(result: boolean): void {
    this.toggleShowConfirmModal();
    if (result)
      this.dataRepositoryService.deleteAuditoirum(
        this.auditorium.id,
        this.$isLoadingStream
      );
  }

  getFormContext(): FormContext {
    return {
      contextObj: this.auditorium,
      contextName: 'auditorium',
    };
  }
}
