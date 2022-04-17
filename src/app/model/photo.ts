import { User } from "./user";

export class Photo {
    id?: string = '';
    fileName: string = '';
    user?: User = new User();
    downloadPath?: string = '';
    fileType?: string = '';
    fileSize?: string = '';
    dateUploaded?: string = '';
}