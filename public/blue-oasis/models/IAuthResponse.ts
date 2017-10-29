import IUser from './IUser';

interface IAuthResponse {
    success: boolean;
    data: {
        token: string;
        user: IUser;
    };
}

export default IAuthResponse;
