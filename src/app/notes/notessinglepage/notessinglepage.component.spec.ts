import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotessinglepageComponent } from './notessinglepage.component';

describe('NotessinglepageComponent', () => {
  let component: NotessinglepageComponent;
  let fixture: ComponentFixture<NotessinglepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotessinglepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotessinglepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
