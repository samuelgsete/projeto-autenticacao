export class UserAccess {

    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public accessedIn: Date;
    
    public constructor(values: Object = {}) { Object.assign(this, values) }
}