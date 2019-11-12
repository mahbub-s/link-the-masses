import { Response } from './response';

export class Chat {
    public _id: string;
    public id: number;
    public type: number;
    public creationDate: Date;
    public researcher: string;

    // filter criterias
    public upperAgeRange: number;
    public lowerAgeRange: number;
    public sex;

    public title: string;
    public status: number;
    public description: string;

    public responses: Response[];

    constructor() {
        this.creationDate = new Date();
        this.type = 1;
        this.responses = [];
    }
}
