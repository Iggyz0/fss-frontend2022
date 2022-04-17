import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let user: User = {
      "username": form.value.username, 
      "password": form.value.password
    }

    this.authService.loginUser(user).subscribe(response => {
      
      if (response.headers.get("authorization") != null && response.headers.get("authorization") != "") {
        this.authService.getJwtTokenService().setToken(response.headers.get("authorization")!);
        this.authService.getLocalStorageService().setLocalStorageItem("token", response.headers.get("authorization")!);
        this.authService.getLocalStorageService().setLocalStorageItem("username", user.username);

        this.userService.setCurrentUser(
          {
            "id": response.body.id,
            "username": response.body.username,
            "firstName": response.body.firstName,
            "lastName": response.body.lastName,
            "email": response.body.email
          }
        )

        this.authService.logTheUserIn();
        this.router.navigate(["notes"]);
      }
      else {
        this._snackBar.open("Something went wrong...", "", {duration: 2500});
      }
    });
  }
  
}
