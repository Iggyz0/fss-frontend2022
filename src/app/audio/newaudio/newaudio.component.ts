import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from 'src/app/services/audio.service';
import { JwttokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-newaudio',
  templateUrl: './newaudio.component.html',
  styleUrls: ['./newaudio.component.css']
})
export class NewaudioComponent implements OnInit {

  fileName = "";

  formData = new FormData;

  fileMissing = "";

  // kako proveriti da li je promenljiva fajl prazna?
  // file = new File([""], ""); 
  file: any;

  constructor(private audioService: AudioService, private jwtTokenService: JwttokenService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formData = new FormData;
    this.fileName = "";
    this.fileMissing = "";
    this.file = null;
  }

  onSubmit() {
    // let ext = this.file.name.substr(this.file.name.lastIndexOf('.') + 1);
    this.formData.append("file", this.file);

    if (this.formData.get("file") && this.file != null) {
      this.fileMissing = "";
      this.formData.append("username", this.jwtTokenService.getUser().username);
      if (this.isFileAudio(this.file)) {
        this.audioService.uploadAudio(this.formData).subscribe(value => {
          if (value != null) {
            this._snackBar.open("Audio file uploaded!", "", {duration: 2500});
          } else { this._snackBar.open("Upload failed!", "", {duration: 2500}); }
        }).add(() => { 
          this.file = null; 
          this.formData = new FormData; 
          this.fileName = "";
        });
      } else {
        this.fileMissing = "File is not an audio file!";
      }
      
    } else {
      this.fileMissing = "Audio file is required!";
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (this.file != null) {
      this.fileName = this.file.name;
    }
  }

  isFileAudio(file: File): boolean {
    return file && file['type'].split('/')[0] === 'audio';
  }

 }
