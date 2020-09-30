import { Component, OnInit, OnDestroy} from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { AuthService } from '../home-page/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogedIn = false;
  private userSub: Subscription;

  constructor(private databaseService: DatabaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
        this.isLogedIn = !user ? false : true;
    })

  }
onSaveToDatabase() {
  this.databaseService.storeRecipes();
}
onLogout() {
  this.authService.logout();
}
onFetchFromDatabase() {
  this.databaseService.fetchRecipes().subscribe();
}


ngOnDestroy() {
  this.userSub.unsubscribe();
}
}
