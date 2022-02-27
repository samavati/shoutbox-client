import { IUser } from "../User";

export interface IMessage {
    id: string;
    user: IUser;
    date: string;
    message: string;
    isMe: boolean
}