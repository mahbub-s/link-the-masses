export class User {
    public _id: string;
    public id: number;

    public username: string;
    public role: number;

    public firstName: string;
    public lastName: string;
    public age: number;
    public sex: number;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public country: string;

    public studies: any[];

    constructor() {
        this.studies = [];
    }
}
