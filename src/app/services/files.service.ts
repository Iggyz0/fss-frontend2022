import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllFilesWrap } from '../model/allFilesWrap';
import { FileFromUser } from '../model/file';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http:HttpClient) { }

  public uploadFiles(formData: FormData): Observable<HttpEvent<any>> {
    
    let url = "http://localhost:8080/files/uploadfiles";
    
    return this.http.post<any>(url, formData, { reportProgress: true, observe: 'events' });
  }

  public findAllByUsername(username: string) : Observable<AllFilesWrap> {
    return this.http.get<AllFilesWrap>("http://localhost:8080/files/findallbyusername?username=" + username);
  }

  downloadFile(id: string, username: string): Observable<HttpResponse<any>> {

    const url = "http://localhost:8080/files/myfiles/downloadfile?id=" + id + "&username=" + username;

    return this.http.get<any>(url, { observe: 'response', responseType: 'blob' as 'json' });
  }

  deleteFileById(id: string, username: string): Observable<HttpResponse<any>> {

    const url = "http://localhost:8080/files/myfiles/deletefile?id=" + id + "&username=" + username;

    return this.http.delete<any>(url, { observe: 'response' });
  }
}
