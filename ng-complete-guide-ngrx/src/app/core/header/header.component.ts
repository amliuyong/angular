import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {AppState} from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AuthState} from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  _isAuthenticated = false;

  constructor(private dataStore: DataStorageService,
              private authService: AuthService,
              private store: Store<AppState>) {

  }


  onSaveDate() {
    this.dataStore.storeRecieps().subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error) => {
        console.log('onSaveDate error:', error);
      }
    );
  }

  onFetchData() {
    this.dataStore.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this._isAuthenticated;

  }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .subscribe((authState: AuthState) => {
        console.log("AuthState:", authState);
        this._isAuthenticated = authState.authenticated;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
