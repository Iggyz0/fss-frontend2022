import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewnoteComponent } from './notes/newnote/newnote.component';
import { MynotesComponent } from './notes/mynotes/mynotes.component';
import { NotesComponent } from './notes/notes.component';
import { PhotosComponent } from './photos/photos.component';
import { NewphotoComponent } from './photos/newphoto/newphoto.component';
import { MyphotosComponent } from './photos/myphotos/myphotos.component';
import { NotessinglepageComponent } from './notes/notessinglepage/notessinglepage.component';
import { PagenotfoundComponent } from './lostRoutes/pagenotfound/pagenotfound.component';
import { NewfileComponent } from './files/newfile/newfile.component';
import { MyfilesComponent } from './files/myfiles/myfiles.component';
import { FilesComponent } from './files/files.component';

import { NotesService } from './services/notes.service';
import { UserService } from './services/user.service';
import { PhotoService } from './services/photo.service';
import { FilesService } from './services/files.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { LocalstorageService } from './services/localstorage.service';
import { JwttokenService } from './services/jwttoken.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthguardService } from './services/guards/authguard.service';
import { ComponentaccessService } from './services/guards/componentaccess.service';
import { AudioComponent } from './audio/audio.component';
import { AudioService } from './services/audio.service';
import { NewaudioComponent } from './audio/newaudio/newaudio.component';
import { MyaudioComponent } from './audio/myaudio/myaudio.component';

import { StringTruncationPipe } from './string-trunc';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewFileComponent } from './dialogs/view-file/view-file.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NewnoteComponent,
    MynotesComponent,
    NotesComponent,
    PhotosComponent,
    NewphotoComponent,
    MyphotosComponent,
    NotessinglepageComponent,
    PagenotfoundComponent,
    FilesComponent,
    NewfileComponent,
    MyfilesComponent,
    WelcomeComponent,
    AudioComponent,
    NewaudioComponent,
    MyaudioComponent,
    StringTruncationPipe,
    UserProfileComponent,
    ViewFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FlexLayoutModule,
    FormsModule,
    TextFieldModule,
    NgxPaginationModule
  ],
  providers: [
    AuthguardService, ComponentaccessService, NotesService, UserService, AuthService, PhotoService, FilesService, LocalstorageService, JwttokenService, AudioService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
