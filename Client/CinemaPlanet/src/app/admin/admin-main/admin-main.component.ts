import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.sass'],
})
export class AdminMainComponent implements OnInit {
  showStatistics = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/admin') {
          this.showStatistics = true;
          return;
        }
        this.showStatistics = false;
      }
    });
  }
}
