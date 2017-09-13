import IUser from './IUser';

interface IAuthResponse {
    token: string;
    user: IUser;
}

export default IAuthResponse;
