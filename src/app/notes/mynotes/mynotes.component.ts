import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwttokenService } from 'src/app/services/jwttoken.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css']
})
export class MynotesComponent implements OnInit {

  constructor(private notesService:NotesService, private _snackBar: MatSnackBar, private jwtTokenService: JwttokenService) { }

  data: any;

  ngOnInit(): void {
    this.findAllByUsername();
  }

  public findAllByUsername(): any {
    this.notesService.findAllByUsername(this.jwtTokenService.getUser().username).subscribe(value => { this.data = value; });
  }

  public deleteNote(id: string): any {
    this.notesService.deleteNote(id).subscribe(data => { 
      this._snackBar.open("Note deleted!", "", {duration: 2500});
      setTimeout(()=>{this.findAllByUsername()}, 0);
    });
  }

  public editNoteRedirect(id: string): any {
    this.notesService.editNote(id);
  }

  public search(search: string) {
    search = search.trim();
    if (search != "") {
      this.notesService.searchNotes(search, this.jwtTokenService.getUser().username).subscribe(result => { this.data = result; });
    }
    else {
      this.findAllByUsername();
    }
  }

}