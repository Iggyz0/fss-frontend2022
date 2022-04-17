import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileFromUser } from 'src/app/model/file';
import { FilesService } from 'src/app/services/files.service';
import { JwttokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit, AfterViewInit {

  fileTable = new MatTableDataSource<FileFromUser>();
  displayedColumns = ["No.", "fileName", "extension", "fileSize", "dateUploaded", "downloadPath"];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private filesService: FilesService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService) { }

  ngOnInit(): void {
    this.findAllByUsername();
  }

  ngAfterViewInit(){
    this.fileTable.sort = this.sort;
    this.fileTable.paginator = this.paginator;
  }

  public findAllByUsername() {
    this.filesService.findAllByUsername(this.jwtTokenService.getUser().username).subscribe(data => { 
      
      data.forEach(element => {
        element.fileSize = this.bytesToSize(element.fileSize);
      })
      
      this.fileTable.data = data;
    });
  }

  // edit: sada radi
  // nista ne radi
  public downloadFile(id: string): HttpResponse<any> | null {
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
    return null;
  }

  getFileNameFromHttpResponse(httpResponse: any) {
    let contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    let result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  deleteFile(id: string) {
    this.filesService.deleteFileById(id, this.jwtTokenService.getUser().username).subscribe(event => {
      if (event.status == 200) {
        this._snackBar.open("File deleted!", "", {duration: 2500});
        setTimeout(()=>{this.findAllByUsername();}, 2500);
      }
      
    });
    
  }

  bytesToSize(bytesString?: string) {
    let bytes = parseInt(bytesString || "");
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

  doFilter(filterValue: string){
    this.fileTable.filter = filterValue.trim().toLowerCase();
  }

}
