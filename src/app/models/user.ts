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

    public studies: any[];

    public password: string; //temp

    constructor() {
        this.studies = [];
    }
}
