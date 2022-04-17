import { User } from "./user";

export class Note {
    id?: string = '';
    title: string = '';
    tags: string[] = [];
    slug?: string = '';
    user?: User = new User();
    content: string = '';
    dateCreated?: string = '';
    dateUpdated?: string = '';
}