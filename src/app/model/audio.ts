import { User } from "./user";

export class Audio {
    id?: string = '';
    fileName: string = '';
    user?: User = new User();
    downloadPath?: string = '';
    fileType?: string = '';
    fileSize?: string = '';
    dateUploaded?: string = '';
    duration?: string = '';
    sampleRate?: string = '';
    genre?: string = '';
    audioChannels?: string = '';
    channelType?: string = '';
    artist?: string = '';
}