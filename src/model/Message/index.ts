import { IUser } from "../User";

export interface IMessage {
    id: string;
    user: IUser;
    message: string;
    isMe:boolean
}