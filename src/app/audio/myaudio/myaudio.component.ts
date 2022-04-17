import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from 'src/app/services/audio.service';
import { JwttokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-myaudio',
  templateUrl: './myaudio.component.html',
  styleUrls: ['./myaudio.component.css']
})
export class MyaudioComponent implements OnInit {

  constructor(private audioService: AudioService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService) { }

  data: any;

  ngOnInit(): void {
    this.findAllByUsername();
  }

  public findAllByUsername() {
    this.audioService.findAllByUsername(this.jwtTokenService.getUser().username).subscribe(data => { 
      
      // data.forEach(element => {
      //   element.sampleRate += " Hz";
      // })
      
      this.data = data;
    });
  }

  public downloadAudio(fileName: string): HttpResponse<any> | null {
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
    return null;
  }

  getFileNameFromHttpResponse(httpResponse: any) {
    let contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
    let result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  bytesToSize(bytesString?: string) {
    let bytes = parseInt(bytesString || "");
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

  deleteAudio(fileName: string) {
    this.audioService.deleteAudio(fileName, this.jwtTokenService.getUser().username).subscribe(event => {
      if (event.status == 200) {
        this._snackBar.open("Audio file deleted!", "", {duration: 2500});
        setTimeout(()=>{this.findAllByUsername();}, 2500);
      }
      
    });
  }

  convertSecondsIntoMinutesFormated(time: string): string {
    let floatTime = parseFloat(time)
    let hrs = ~~(floatTime / 3600);
    let mins = ~~((floatTime % 3600) / 60);
    let secs = ~~floatTime % 60;

    let convertedTime = "";
    if (hrs > 0) {
      convertedTime += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    convertedTime += "" + mins + ":" + (secs < 10 ? "0" : "");
    convertedTime += "" + secs;

    return convertedTime;
  }

  search(search: string) {
    search = search.trim();
    if (search != "") {
      this.audioService.searchAudio(search, this.jwtTokenService.getUser().username).subscribe(result => { 
        // result.forEach(element => {
        //   element.sampleRate += " Hz";
        // })
        
        this.data = result; 
      });
    }
    else {
      this.findAllByUsername();
    }
  }

}
