import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { FilesComponent } from './files/files.component';
import { NewfileComponent } from './files/newfile/newfile.component';
import { MyfilesComponent } from './files/myfiles/myfiles.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthguardService } from './services/guards/authguard.service';
import { ComponentaccessService } from './services/guards/componentaccess.service';
import { AudioComponent } from './audio/audio.component';
import { NewaudioComponent } from './audio/newaudio/newaudio.component';
import { MyaudioComponent } from './audio/myaudio/myaudio.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const rute: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'signup', component: SignupComponent, canActivate: [AuthguardService] },
    { path: 'login', component: LoginComponent, canActivate: [AuthguardService] },
    { path: 'userprofile', component: UserProfileComponent, canActivate: [ComponentaccessService] },
    { path: 'notes', component: NotesComponent, canActivate: [ComponentaccessService],
        children: [
            { path: "newnote", component: NewnoteComponent }, 
            { path: "mynotes", component: MynotesComponent }
        ]
    },
    { path: 'photos', component: PhotosComponent, canActivate: [ComponentaccessService],
        children: [
            { path: "newphoto", component: NewphotoComponent },
            { path: "myphotos", component: MyphotosComponent }
        ]
    },
    { path: 'notes/editnote/:id', component: NotessinglepageComponent, canActivate: [ComponentaccessService] },
    { path: 'files', component: FilesComponent, canActivate: [ComponentaccessService],
        children: [
            { path: 'newfile', component: NewfileComponent },
            { path: 'myfiles', component: MyfilesComponent }
        ]
    },
    { path: 'audio', component: AudioComponent, canActivate: [ComponentaccessService],
        children: [
            { path: 'newaudio', component: NewaudioComponent },
            { path: 'myaudio', component: MyaudioComponent }
        ]
    },
    { path: 'pagenotfound', component: PagenotfoundComponent },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(rute)
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule {}