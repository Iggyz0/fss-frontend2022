import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LocalstorageService } from './services/localstorage.service';
import { RouteInfoService } from './services/route-info.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'fss-frontend';

  isLoggedIn$: any;
  isDarkTheme: boolean = false;
  currentUsername$: any;
  
  constructor(private authService: AuthService, private userService: UserService, private localStorageService: LocalstorageService, private routeInfo: RouteInfoService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {    
    this.authService.getJwtTokenService().setToken(
      this.authService.getLocalStorageService().getLocalStorageItem("token") || null
    );    

    if (this.authService.getJwtTokenService().isTokenExpired()) {
      this._snackBar.open("Session expired, please log in.", "", { duration: 2500 });
      this.authService.logout();
    } else {
      this.isLoggedIn$ = this.authService.isUserLoggedIn();
  
      if (this.isLoggedIn$) {
        if(this.localStorageService.getLocalStorageItem("username")?.trim() !== "" && 
           this.localStorageService.getLocalStorageItem("username") !== null && 
           this.authService.getLocalStorageService().getLocalStorageItem("token") !== null) {
          this.userService.currentUsername.next(this.authService.getJwtTokenService().getUser().username);
          this.userService.currentUser.id = this.authService.getJwtTokenService().getUser().id;
        }
      }
    }


    this.currentUsername$ = this.userService.currentUsername;   

    this.getThemePreferenceFromLocalStorage();

    this.routeInfo.monitorRouteChange();

  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme)
      this.authService.getLocalStorageService().setLocalStorageItem("theme", "dark");
    else
      this.authService.getLocalStorageService().setLocalStorageItem("theme", "light");
  }

  getThemePreferenceFromLocalStorage() {
    if(this.authService.getLocalStorageService().getLocalStorageItem("theme")) {
      if(this.authService.getLocalStorageService().getLocalStorageItem("theme")?.valueOf() == "light") {
        this.isDarkTheme = false;
      }
      else if (this.authService.getLocalStorageService().getLocalStorageItem("theme")?.valueOf() == "dark")
        this.isDarkTheme = true;
      else
        this.isDarkTheme = false;
    }
  }

  logout() {
    this.authService.logout();
    this._snackBar.open("You have been logged out.", "", {duration: 2500});
    this.router.navigate(["/welcome"]);
  }
}
