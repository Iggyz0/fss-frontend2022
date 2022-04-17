import { User } from "./user";

export class FileFromUser {
    
    id?: string = '';
    fileName: string = '';
    user?: User = new User();
    downloadPath?: string = '';
    extension?: string = '';
    fileSize?: string = '';
    dateUploaded?: string = '';
    
}