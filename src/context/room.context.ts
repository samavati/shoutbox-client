import React from 'react';
import { createContext, useContext } from "react";
import { IUser } from "../model/User";

interface IRoomContext {
    roomUsers: IUser[];
    setRoomUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export const RoomContext = createContext<IRoomContext | null>(null);

export const useRoomUsers = () => {
    return useContext(RoomContext) as IRoomContext;
}