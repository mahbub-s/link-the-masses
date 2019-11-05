import { Entry } from './entry';
export class Diary {
    public _id: string;
    public id: number;
    public type: number;
    public creationDate: Date;
    public researcher: string;

    public title: string;
    public status: number;
    public description: string;

    public entries: Entry[];

    constructor() {
        this.creationDate = new Date();
        this.type = 2;
        this.entries = [];
    }
}
