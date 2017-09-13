import IUser from './IUser';

class User implements IUser {
    public _id: string;
    public username: string;
    public password: string;
    public role: string;

    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export default User;
