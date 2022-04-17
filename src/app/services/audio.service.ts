import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Audio } from '../model/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http:HttpClient) { }

  public uploadAudio(formData: FormData): Observable<HttpResponse<any>> {
    let url = "http://localhost:8080/audio/uploadaudio";
    
    return this.http.post<any>(url, formData);
  }

  public findAllByUsername(username: string): Observable<Audio[]> {
    let url = "http://localhost:8080/audio/findallbyusername?username=" + username;

    return this.http.get<Audio[]>(url);
  }

  deleteAudio(fileName: string, username: string): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/audio/myaudio/deleteaudio?fileName=" + fileName + "&username=" + username;

    return this.http.delete<any>(url, { observe: 'response' });
  }

  downloadAudio(fileName: string, username: string): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/audio/myaudio/downloadaudio?fileName=" + fileName + "&username=" + username;

    return this.http.get<any>(url, { observe: 'response', responseType: 'blob' as 'json' });
  }

  searchAudio(search: string, username: string): Observable<Audio[]> {
    let url = "http://localhost:8080/audio/myaudio/search?username=" + username + "&search=" + search;

    return this.http.get<Audio[]>(url);
  }

}
