import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwttokenService } from 'src/app/services/jwttoken.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ViewFileComponent>, private jwtTokenService: JwttokenService, private localstorage: LocalstorageService) { }

  ftype: string = "";
  fileTypeUrl: string = "";

  ngOnInit(): void {
    this.ftype = this.data.extension.split("/")[0];
    this.fileTypeUrl = this.determineFileType( this.ftype );
  }

  close(){
    this.dialogRef.close();
  }

  determineFileType(fileType: string): string {
    switch(fileType) {
      case "audio": {
        const url = "http://localhost:8080/audio/myaudio/showaudio?fileName=" + this.data.fileName + "&username=" + this.jwtTokenService.getUser().username + "&access_token=" + this.localstorage.getLocalStorageItem("token");

        return url;
      }
      case "image": {
        const url = "http://localhost:8080/photos/myphotos/showphoto?fileName=" + this.data.fileName + "&username=" + this.jwtTokenService.getUser().username + "&access_token=" + this.localstorage.getLocalStorageItem("token");

        return url;
      }
      case "video": {
        const url = "http://localhost:8080/files/myfiles/showfile?id=" + this.data.id + "&username=" + this.jwtTokenService.getUser().username + "&access_token=" + this.localstorage.getLocalStorageItem("token");
        
        return url;
      }
      default: {
        return "dontshow";
      }
    }
  }

}
