import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Photo } from 'src/app/model/photo';
import { JwttokenService } from 'src/app/services/jwttoken.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.component.html',
  styleUrls: ['./myphotos.component.css']
})
export class MyphotosComponent implements OnInit {

  constructor(private photoService: PhotoService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService, private localstorage: LocalstorageService) { }

  data: any;

  public showPhoto(fileName: string) : any {
    const url = "http://localhost:8080/photos/myphotos/showphoto?fileName=" + fileName + "&username=" + this.jwtTokenService.getUser().username + "&access_token=" + this.localstorage.getLocalStorageItem("token");
    return url;
  }

  ngOnInit(): void {
    this.findAllByUsername();
  }

  public findAllByUsername(): any {
    this.photoService.findAllByUsername(this.jwtTokenService.getUser().username).subscribe(value => {
      let temp: any = value;

      temp.forEach((element: Photo) => {
        element.downloadPath =  decodeURI(element.downloadPath!);
        element.downloadPath = element.downloadPath.replace("%3F", "?");
      });

      this.data = temp; 
    });
  }

  public deletePhoto(fileName: string): any {
    this.photoService.deletePhoto(fileName, this.jwtTokenService.getUser().username).subscribe(data => { 
      this._snackBar.open("Photo deleted!", "", {duration: 2500}); 
      setTimeout(()=>{this.findAllByUsername()}, 2500);
      
    });
  }

  public downloadPhoto(fileName: string): HttpResponse<any> | null {
    this.photoService.downloadPhoto(fileName, this.jwtTokenService.getUser().username).subscribe(response => {
          let binaryData = [];
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
    });
    return null;
  }

  bytesToSize(bytesString: string) {
    let bytes = parseInt(bytesString);
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

}
