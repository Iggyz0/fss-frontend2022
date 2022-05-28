import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/model/note';
import { JwttokenService } from 'src/app/services/jwttoken.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css']
})
export class MynotesComponent implements OnInit {

  constructor(private notesService:NotesService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService) { }

  data: Note[] = [];
  displayedData: Note[] = [];
  p: number = 1; // for pagination
  searchValue: string = '';

  ngOnInit(): void {
    this.findAllByUsername();
  }

  public findAllByUsername(): any {
    this.notesService.findAllByUsername(this.jwtTokenService.getUser().username).subscribe(value => { this.data = value; this.displayedData = this.data; });
  }

  public deleteNote(id: string | undefined): any {
    if (id) {
      this.notesService.deleteNote(id).subscribe(data => { 
        this._snackBar.open("Note deleted!", "", {duration: 2500});
        setTimeout(()=>{this.findAllByUsername()}, 0);
      });
    }
  }

  public editNoteRedirect(id: string | undefined): any {
    id ? this.notesService.editNote(id) : null;
  }

  public searchNotes() {
    let search = this.searchValue.trim().toLowerCase();
    let arr = this.data;
    this.p = 1;

    if (search == '')
      arr = this.data;
    else {
      arr = this.data.filter(obj => { 
        return (obj.title.toLowerCase().includes(search) || ( obj.content ? obj.content.toLowerCase().includes(search) : null) ); 
      });
      this.p = 1;
    }

    this.displayedData = arr;
    // search via Database (MongoDB) - very fast
    // if (search != "") {
    //   this.notesService.searchNotes(search, this.jwtTokenService.getUser().username).subscribe(result => { this.data = result; });
    // }
    // else {
    //   this.findAllByUsername();
    // }
  }

}