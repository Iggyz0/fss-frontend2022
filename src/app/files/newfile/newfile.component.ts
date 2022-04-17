import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FileFromUser } from 'src/app/model/file';
import { FilesService } from 'src/app/services/files.service';
import { JwttokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-newfile',
  templateUrl: './newfile.component.html',
  styleUrls: ['./newfile.component.css']
})
export class NewfileComponent implements OnInit {

  fileName = "";

  fileMissing = "";

  files = new Array<File>();

  uploadProgress!: number;

  uploadSub?: Subscription;

  constructor(private filesService: FilesService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService) { }

  ngOnInit(): void {
    this.files = new Array<File>();
    this.fileName = "";
    this.fileMissing = "";
  }

  onSubmit(): void {

    if (this.files.length == 0 || this.files == null) {
      this.fileMissing = "No files selected!";
    }
    else {
      this.fileMissing = "";

      const formData = new FormData();

      for (let index = 0; index < this.files.length; index++) {
        formData.append("files", this.files[index]);
      }

      formData.append("username", this.jwtTokenService.getUser().username);

      this.uploadSub =
      this.filesService.uploadFiles(formData).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
        if (event == null) { this._snackBar.open("Upload failed.", "", {duration: 2500}); }
      }).add(() => { this.files = new Array<File>(); this.fileName = ""; this.fileMissing = ""; });
    }
  }

  // .add(() => { 
  //   this._snackBar.open("File(s) successfully uploaded!", "Ok", {duration: 2000});
  //   setTimeout(() => {
  //     this.reset();
  //     this.fileName = "";
  //   }, 2000);
  // });

  cancelUpload() {
    this.uploadSub!.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = undefined;
  }

  onFileSelected(event: any) {

    this.files = event.target.files;
    
    if (this.files != null) {

      for (let index = 0; index < this.files.length; index++) {
        this.fileName += this.files[index]['name'] + "; ";
      }
      
    }
  }

}
