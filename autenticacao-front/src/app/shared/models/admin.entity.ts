export class Admin {

    public id: number;
    public username: string;
    public password: string;
    public name: string;
   
    public constructor(values: Object = {}) { Object.assign(this, values) }
}