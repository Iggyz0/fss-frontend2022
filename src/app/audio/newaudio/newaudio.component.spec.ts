import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewaudioComponent } from './newaudio.component';

describe('NewaudioComponent', () => {
  let component: NewaudioComponent;
  let fixture: ComponentFixture<NewaudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewaudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewaudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
