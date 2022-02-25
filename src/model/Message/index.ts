import { IAttendee } from "../Attendee";

export interface IMessage {
    id: string;
    attendee: IAttendee;
    message: string;
    isMe:boolean
}