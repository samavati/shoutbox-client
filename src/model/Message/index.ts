import { IUser } from "../User";

export interface IMessage {
    type: 'user' | 'admin' | 'me',
    payload: IUserMessage | { id: string, message: string }
}
export interface IUserMessage {
    id: string;
    user: IUser;
    date: string;
    message: string;
}