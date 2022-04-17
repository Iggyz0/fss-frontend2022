import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
import { User } from '../model/user';
import { JwttokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient, private jwtTokenService: JwttokenService, private router: Router) { }

  public findAllByUsername(username: string) : Observable<Note[]> {
    return this.http.get<Note[]>("http://localhost:8080/notes/findallbyusername?username=" + username);
  }

  public findById(id: string) : Observable<HttpResponse<any>> {
    return this.http.get<any>("http://localhost:8080/notes/findbyid?id=" + id);
  }

  public searchNotes(search: string, username: string): Observable<Note[]> {
    return this.http.get<Note[]>("http://localhost:8080/notes/findallbysearch?search=" + search + "&username=" + username);
  }

  public insertNote(title: string, tagsString: string, content: string) : Observable<HttpResponse<any>> {
    
    var tags = tagsString.trim().replace(/\s/g, '').split(',');

    var user: User = {
      username : this.jwtTokenService.getUser().username
    }

    var note: Note = {
      title,
      tags,
      content,
      user
    };

    const url = "http://localhost:8080/notes/insert";
  
    return this.http.post<any>(url, note);

  }

  deleteNote(id: string): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/notes/delete/" + id;

    return this.http.delete<any>(url);
  }

  editNote(id: string): any {
    let url = "/notes/editnote/" + id;
    this.router.navigateByUrl(url);
  }

  editNoteInDatabase(id: string, title: string, tags: string[], content: string): Observable<HttpResponse<any>> {

    var note: Note = {
      id,
      title,
      tags,
      content
    }

    const url = "http://localhost:8080/notes/update";
      
    return this.http.put<any>(url, note);
  }
  
}
