import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private dataStore: DataStorageService,
              private authService: AuthService) {

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

  isAuthenticated(){
   return this.authService.isAuthenticated();

  }
}
