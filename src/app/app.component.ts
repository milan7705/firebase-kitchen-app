import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './home-page/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hideToolbar: boolean;
  dynamicPadding: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('/home') || event.urlAfterRedirects.includes('/home')) {
        this.hideToolbar = true;
        this.dynamicPadding = 'p-0';
      } 
       else {
        this.hideToolbar = false;
        this.dynamicPadding = 'pt-60';
      }
    });
  }
  ngOnInit() {
    this.authService.autoLogin();
  }
}
