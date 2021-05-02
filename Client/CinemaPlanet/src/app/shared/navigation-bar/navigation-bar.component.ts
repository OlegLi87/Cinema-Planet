import { AuthService } from './../../services/auth.service';
import {
  NavigationContext,
  NavigationContextProviderService,
} from './../../services/navigationContextProvider.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USER_STREAM } from 'src/app/infastructure/dependency_providers/userStream.provider';
import { AuthRole, User } from 'src/app/models/user.model';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.sass'],
  providers: [NavigationContextProviderService],
})
export class NavigationBarComponent implements OnInit {
  navigationContext: NavigationContext;
  showConfirmModal = false;

  constructor(
    @Inject(USER_STREAM) private $userStream: BehaviorSubject<User>,
    private navigationContextProvider: NavigationContextProviderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.navigationContext = this.navigationContextProvider.getNavigationContext();
  }

  onConfirmModalClosed(result: boolean): void {
    this.showConfirmModal = false;
    if (result) this.logout();
  }

  logout(): void {
    this.authService.logout();
  }

  onLogoHoverOn(event: Event): void {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    const logo = event.target as HTMLAnchorElement;
    if (logo.classList.contains('active')) return;
    logo.classList.add('logo-hovered');
  }

  onLogoHoverOff(event: Event): void {
    (event.target as HTMLAnchorElement).classList.remove('logo-hovered');
  }

  get userName(): string {
    const user = this.$userStream.value;
    if (user.role === AuthRole.Admin) return null;
    return user.username;
  }
}
