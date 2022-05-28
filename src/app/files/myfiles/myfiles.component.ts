import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewFileComponent } from 'src/app/dialogs/view-file/view-file.component';
import { FileFromUser } from 'src/app/model/file';
import { AudioService } from 'src/app/services/audio.service';
import { FilesService } from 'src/app/services/files.service';
import { JwttokenService } from 'src/app/services/jwttoken.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit, AfterViewInit {

  fileTable = new MatTableDataSource<FileFromUser>();
  displayedColumns = ["No.", "fileName", "extension", "fileSize", "dateUploaded", "downloadPath"];
  dialogOpen: boolean = false;
  allFiles: FileFromUser[] = [];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private filesService: FilesService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService, private dialog: MatDialog, private localstorage: LocalstorageService, private audioService: AudioService, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.findAllByUsername();
  }

  ngAfterViewInit(){
    this.fileTable.sort = this.sort;
    this.fileTable.paginator = this.paginator;
  }

  public findAllByUsername() {
    this.allFiles = [];
    this.filesService.findAllByUsername(this.jwtTokenService.getUser().username).subscribe(data => {

      data.audios.forEach(element => {
        element.fileSize = this.bytesToSize(element.fileSize);
        this.allFiles.push(this.mapToFileFromUser(element));
      })

      data.photos.forEach(element => {
        element.fileSize = this.bytesToSize(element.fileSize);
        this.allFiles.push(this.mapToFileFromUser(element));
      })

      data.files.forEach(element => {
        element.fileSize = this.bytesToSize(element.fileSize);
        this.allFiles.push(element);
      })
      
      this.fileTable.data = this.allFiles;
    });
  }

  // edit: sada radi
  // nista ne radi
  public downloadFile(id: string, fileName: string, fileType: string): HttpResponse<any> | null {
    
    if (fileType.includes("audio")) {
      this.audioService.downloadAudio(fileName, this.jwtTokenService.getUser().username).subscribe(response => {
        let fileName = this.getFileNameFromHttpResponse(response);
        let binaryData = [];
        binaryData.push(response.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
    } 
    else if (fileType.includes("image")) {
      this.photoService.downloadPhoto(fileName, this.jwtTokenService.getUser().username).subscribe(response => {
        let fileName = this.getFileNameFromHttpResponse(response);
        let binaryData = [];
        binaryData.push(response.body);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
    }
    else {
      this.filesService.downloadFile(id, this.jwtTokenService.getUser().username).subscribe(response => {
            let fileName = this.getFileNameFromHttpResponse(response);
            let binaryData = [];
            binaryData.push(response.body);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
            downloadLink.setAttribute('download', fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
      });
    }
    return null;
  }

  getFileNameFromHttpResponse(httpResponse: any) {
    let contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    let result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  deleteFile(id: string, fileName: string, fileType: string) {
    if (fileType.includes("audio")) {
      this.audioService.deleteAudio(fileName, this.jwtTokenService.getUser().username).subscribe(event => {
        if (event.status == 200) {
          this._snackBar.open("Audio file deleted!", "", {duration: 2500});
          setTimeout(()=>{this.findAllByUsername();}, 2500);
        }
        
      });
    }
    else if (fileType.includes("image")) {
      this.photoService.deletePhoto(fileName, this.jwtTokenService.getUser().username).subscribe(data => { 
        this._snackBar.open("Photo deleted!", "", {duration: 2500}); 
        setTimeout(()=>{this.findAllByUsername()}, 2500);
        
      });
    }
    else {
      this.filesService.deleteFileById(id, this.jwtTokenService.getUser().username).subscribe(event => {
        if (event.status == 200) {
          this._snackBar.open("File deleted!", "", {duration: 2500});
          setTimeout(()=>{this.findAllByUsername();}, 2500);
        }
        
      });
    }
    
  }

  bytesToSize(bytesString?: string) {
    let bytes = parseInt(bytesString || "");
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

  // local search/filter
  doFilter(filterValue: string){
    this.fileTable.filter = filterValue.trim().toLowerCase();
  }

  mapToFileFromUser(file: any): FileFromUser { // ili audio ili photo mapiramo u fajl
    let fileFromUser: FileFromUser = {
      id: file.id,
      fileName: file.fileName,
      user: file.user,
      downloadPath: file.downloadPath,
      extension: file.fileType,
      fileSize: file.fileSize,
      dateUploaded: file.dateUploaded
    };

    return fileFromUser;
  }

  viewFile(file: any) {
    this.dialogOpen = true;

    const productDetailsDialog = this.dialog.open(ViewFileComponent, {
      disableClose: true,
      width: '70vw',
      panelClass: "dialog-responsive",
      data: file
    });

    productDetailsDialog.afterOpened().subscribe(() => {
      if(this.localstorage.getLocalStorageItem("theme") == "dark") {
          productDetailsDialog.addPanelClass('darkMode');
      }
    });

    productDetailsDialog
    .afterClosed()
    .subscribe(
      result => { this.dialogOpen=false;
      }
    );
  }

}
