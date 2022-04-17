import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-newnote',
  templateUrl: './newnote.component.html',
  styleUrls: ['./newnote.component.css']
})
export class NewnoteComponent implements OnInit {

  constructor(private notesService:NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.notesService.insertNote(form.value.title, form.value.tags, form.value.noteContent).subscribe(data => {
      this._snackBar.open("Note created!", "", { duration: 2500 });
      form.reset();
    });
  }
  
}
