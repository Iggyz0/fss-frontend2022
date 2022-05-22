import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorExists = false;
  errorText = "";
  newUser: any;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let user: User = {
      "username": form.value.username, 
      "password": form.value.password,
      "email": form.value.email, 
      "lastName": form.value.lastName,
      "firstName": form.value.firstName
    }

    this.authService.registerUser( user ).subscribe(data => {
      this.newUser = data;
      if(this.newUser != null) {
        this._snackBar.open("Successfully registered! You may now log-in!", "", {duration: 2500});
        form.reset();
        this.router.navigate(["login"]);
      }
      else {
        this._snackBar.open("Username already exists. Please choose another one...", "", {duration: 2500});
      }
    }, err => this._snackBar.open("Something went wrong again...", "", {duration: 2500}) );
  }

}
