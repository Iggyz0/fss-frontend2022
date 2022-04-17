import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaudioComponent } from './myaudio.component';

describe('MyaudioComponent', () => {
  let component: MyaudioComponent;
  let fixture: ComponentFixture<MyaudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
