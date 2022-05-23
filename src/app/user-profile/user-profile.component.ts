import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    if ( this.localstorageService.getLocalStorageItem("id") != "" && this.localstorageService.getLocalStorageItem("id") != null && this.localstorageService.getLocalStorageItem("id"))
    this.userService.getUserByIdFromTheServer(this.localstorageService.getLocalStorageItem("id")!).subscribe(
      result => { 
        if (result != null && result) this.user = result; console.log(this.user); 
      }, 
      err => { 
        
      }
    );

    
    
  }

}
