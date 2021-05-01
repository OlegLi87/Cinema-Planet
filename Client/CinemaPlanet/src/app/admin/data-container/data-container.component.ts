import { Movie } from './../../models/domain_models/movie.model';
import { FormContext } from './../form-container/form-container.component';
import { DataRepositoryService } from '../services/dataRepository.service';
import { Auditorium } from './../../models/domain_models/auditorium.model';
import {
  isLoadingStreamProvider,
  IS_LOADING_STREAM,
} from './../../infastructure/dependency_providers/isLoadingStream.provider';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.sass'],
  providers: [isLoadingStreamProvider],
})
export class DataContainerComponent implements OnInit {
  @Input() dataContext: Auditorium & Movie;
  @ViewChild('image') image: ElementRef<HTMLDivElement>;
  isLoading = false;
  showEnlargedImage = false;
  showForm = false;
  showConfirmModal = false;

  constructor(
    private dataRepositoryService: DataRepositoryService,
    @Inject(IS_LOADING_STREAM)
    private $isLoadingStream: Subject<boolean>
  ) {}

  ngOnInit(): void {
    this.$isLoadingStream
      .pipe(distinctUntilChanged())
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }

  toggleShowEnlargedImage(event: MouseEvent): void {
    if (!this.dataContext.genre) return;
    if (event.type === 'mouseover') {
      if (this.showEnlargedImage) return;
      this.showEnlargedImage = true;
    } else this.showEnlargedImage = false;
  }

  toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  toggleShowConfirmModal(): void {
    this.showConfirmModal = !this.showConfirmModal;
  }

  confirmModalClosed(result: boolean): void {
    this.toggleShowConfirmModal();
    if (result) {
      if (this.dataContext.genre)
        this.dataRepositoryService.deleteMovie(
          this.dataContext.id,
          this.$isLoadingStream
        );
      else
        this.dataRepositoryService.deleteAuditoirum(
          this.dataContext.id,
          this.$isLoadingStream
        );
    }
  }

  get formContext(): FormContext {
    return {
      contextObj: this.dataContext,
      contextName: this.dataContext.genre ? 'movie' : 'auditorium',
    };
  }

  get additionalInfoPropertiesKeyWords(): string[] {
    return ['genre', 'seat', 'session'];
  }

  get additionalInfoProperties(): string[] {
    const additionalInfoProps: string[] = [];
    Object.keys(this.dataContext).forEach((prop) => {
      if (this.isAdditionalInfoProperty(prop)) additionalInfoProps.push(prop);
    });

    return additionalInfoProps;
  }

  getTextColorClasses(property: string): { [className: string]: boolean } {
    const isMainGreenClassActive = !(
      property.includes('basic') ||
      property.includes('silver') ||
      property.includes('gold')
    );

    return {
      'text-primary': property.includes('basic'),
      'text-muted': property.includes('silver'),
      'text-warning': property.includes('gold'),
      'main-green-color': isMainGreenClassActive,
    };
  }

  private isAdditionalInfoProperty(property: string): boolean {
    let isAdditionalInfoProperty = false;
    this.additionalInfoPropertiesKeyWords.forEach((p) => {
      if (property.toLocaleLowerCase().indexOf(p) !== -1)
        isAdditionalInfoProperty = true;
    });
    return isAdditionalInfoProperty;
  }
}
