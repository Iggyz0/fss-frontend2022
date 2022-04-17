import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../model/photo';
import { JwttokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http:HttpClient, private jwtTokenService: JwttokenService) { }

  public uploadPhoto(formData: FormData): Observable<HttpResponse<any>> {
    formData.append("username", this.jwtTokenService.getUser().username)

    let url = "http://localhost:8080/photos/uploadphoto";
    
    return this.http.post<any>(url, formData);
  }

  public findAllByUsername(username: string): Observable<Photo[]> {
    let url = "http://localhost:8080/photos/findallbyusername?username=" + username;

    return this.http.get<Photo[]>(url);
  }

  deletePhoto(fileName: string, username: string): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/photos/myphotos/deletephoto?fileName=" + fileName + "&username=" + username;

    return this.http.delete<any>(url);
  }

  downloadPhoto(fileName: string, username: string): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/photos/myphotos/downloadphoto?fileName=" + fileName + "&username=" + username;

    return this.http.get<any>(url, { observe: 'response', responseType: 'blob' as 'json' });
  }


}