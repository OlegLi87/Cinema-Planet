import { AuthService } from './../../services/auth.service';
import {
  NavigationContext,
  NavigationContextProviderService,
} from './../../services/navigationContextProvider.service';
import { Component, OnInit } from '@angular/core';

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
    const logo = event.target as HTMLAnchorElement;
    if (logo.classList.contains('active')) return;
    logo.classList.add('logo-hovered');
  }

  onLogoHoverOff(event: Event): void {
    (event.target as HTMLAnchorElement).classList.remove('logo-hovered');
  }
}
