import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notessinglepage',
  templateUrl: './notessinglepage.component.html',
  styleUrls: ['./notessinglepage.component.css']
})
export class NotessinglepageComponent implements OnInit {

  id: string = "";
  data: any;

  constructor(private route: ActivatedRoute, private notesService: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => { 
      this.id = value["id"];
    });

    this.data = this.findById(this.id);
  }

  public findById(id: string): any {
    return this.notesService.findById(id).subscribe(value => { this.data = value; });
  }

  // on edit clicked -> edit logic
  onSubmit(form: NgForm): any {
    var tagsArray = form.value.tags;
    if (!Array.isArray(tagsArray)) {
      tagsArray = tagsArray.trim().replace(/\s/g, '').split(',');
    }
    this.notesService.editNoteInDatabase(form.value.id, form.value.title, tagsArray, form.value.noteContent).subscribe(data => {
      this._snackBar.open("Note edited!", "", { duration: 2500 });
      
    });
  }
}
