import { IUser } from "../User";

export interface IMessage {
    id: string;
    attendee: IUser;
    message: string;
    isMe:boolean
}