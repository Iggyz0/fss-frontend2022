import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { JwttokenService } from './services/jwttoken.service';
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
  
  constructor(private authService: AuthService, private userService: UserService, private localStorageService: LocalstorageService, private jwtTokenService: JwttokenService, private routeInfo: RouteInfoService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {    
    this.jwtTokenService.setToken(
      this.localStorageService.getLocalStorageItem("token") || null
    );    

    if (this.jwtTokenService.isTokenExpired()) {
      this._snackBar.open("Session expired, please log in.", "", { duration: 2500 });
      this.authService.logout();
    } else {
      this.isLoggedIn$ = this.authService.isUserLoggedIn();
  
      // NOTE: check security of this code
      if (this.isLoggedIn$) {
        if(this.localStorageService.getLocalStorageItem("username")?.trim() !== "" && 
           this.localStorageService.getLocalStorageItem("username") !== null && 
           this.localStorageService.getLocalStorageItem("token") !== null) {

            this.userService.currentUsername.next(this.jwtTokenService.getUser().username);
            this.userService.currentUser = this.userService.getUserById(this.jwtTokenService.getUser().id!);
          
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
      this.localStorageService.setLocalStorageItem("theme", "dark");
    else
      this.localStorageService.setLocalStorageItem("theme", "light");
  }

  getThemePreferenceFromLocalStorage() {
    if(this.localStorageService.getLocalStorageItem("theme")) {
      if(this.localStorageService.getLocalStorageItem("theme")?.valueOf() == "light") {
        this.isDarkTheme = false;
      }
      else if (this.localStorageService.getLocalStorageItem("theme")?.valueOf() == "dark")
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
