import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-newphoto',
  templateUrl: './newphoto.component.html',
  styleUrls: ['./newphoto.component.css']
})
export class NewphotoComponent implements OnInit {

  fileName = "";

  formData = new FormData;

  fileMissing = "";

  file = new File([""], ""); // kako proveriti da li je promenljiva fajl prazna?

  constructor(private photoService: PhotoService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formData = new FormData;
    this.fileName = "";
    this.fileMissing = "";
    this.file = new File([""], "");
  }

  onSubmit(form: NgForm): void {
    
    if ((form.value.fileName).trim() != "") {
      this.fileName = form.value.fileName;
    }
    let ext = this.file.name.substring(this.file.name.lastIndexOf('.') + 1);
    this.formData.append("file", this.file, (this.fileName + "." + ext));
    
    if (this.formData.get("file")) {
      this.fileMissing = "";
      if (this.isFileImage(this.file)) {
        this.photoService.uploadPhoto(this.formData).subscribe(value => {
          if (value != null) {
            this._snackBar.open("Photo uploaded!", "", {duration: 2500});
            form.reset();
            this.fileName = "";
            this.formData.delete('file');
            this.formData.delete('username');
            this.formData = new FormData(); // za svaki slucaj; edit: ne radi???
            this.file = new File([""], "");
          } else { this._snackBar.open("Upload failed!", "", {duration: 2500}); }
        });
      } else {
        this.fileMissing = "File is not an image!";
      }
      
    } else {
      this.fileMissing = "File is required!";
    }
  }

  onFileSelected(event: any) {
     this.file = event.target.files[0];

    if (this.file != null) {
      this.fileName = this.file.name.substring(0, this.file.name.lastIndexOf('.'));
    }
  }

  isFileImage(file: File): boolean {
    return file && file['type'].split('/')[0] === 'image';
  }

}
