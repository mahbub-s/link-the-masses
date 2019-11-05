import { Question } from './question';

export class Questionnaire {
    // tslint:disable-next-line: variable-name
    public _id: string;
    public id: number;
    public type: number;
    public creationDate: Date;
    public researcher: string;

    public title: string;
    public status: number;

    public questions: Question[];

    constructor() {
        this.creationDate = new Date();
        this.type = 0;
        this.questions = [];
    }
}
