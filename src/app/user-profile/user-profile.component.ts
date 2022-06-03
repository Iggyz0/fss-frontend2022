import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';
import { LocalstorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private localstorageService: LocalstorageService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if ( this.localstorageService.getLocalStorageItem("id") != "" && this.localstorageService.getLocalStorageItem("id") != null && this.localstorageService.getLocalStorageItem("id"))
    this.userService.getUserByIdFromTheServer(this.localstorageService.getLocalStorageItem("id")!).subscribe(
      result => { 
        if (result != null && result) this.user = result; 
      }, 
      err => { 
        
      }
    );
  }

  onSubmit(form: NgForm) {

    let user: User = new User();

    if (this.user == null || !this.user.id) {
      this.snackbar.open("Something went wrong.", "", { duration: 2500 });
      return;
    }

    let newPassword = form.value.password.trim();

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

    if ( newPassword.length > 0 ) {

      if ( newPassword.length >= 8 && newPassword.length <= 64 ) {

        user = {
          "id": this.user.id,
          "username": this.user.username,
          "email": form.value.email, 
          "password": newPassword,
          "lastName": form.value.lastName,
          "firstName": form.value.firstName
        }

      }
      else {

        this.snackbar.open("That password length is not allowed!", "", { duration: 2500 });
        return;

      }

    }
    else {

      user = {
        "id": this.user.id,
        "username": this.user.username,
        "email": form.value.email,
        "lastName": form.value.lastName,
        "firstName": form.value.firstName
      }

    }
    
    this.userService.updateUser(user).subscribe(result => { 
      if (result != null) { 
        console.log(result);
        this.user = result;
        this.userService.setCurrentUser(result);
        
      } 
    }, 
    err=>{
      console.log(err);
    });


  }

}
