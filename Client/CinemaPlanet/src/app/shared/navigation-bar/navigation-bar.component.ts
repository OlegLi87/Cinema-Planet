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

  constructor(
    private navigationContextProvider: NavigationContextProviderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.navigationContext = this.navigationContextProvider.getNavigationContext();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
