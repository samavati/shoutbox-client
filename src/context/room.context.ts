import React from 'react';
import { createContext, useContext } from "react";
import { IUser } from "../model/User";

interface IRoomContext {
    roomUsers: { [key: string]: IUser };
    setRoomUsers: React.Dispatch<React.SetStateAction<{ [key: string]: IUser }>>,
}

export const RoomContext = createContext<IRoomContext>({} as IRoomContext);

export const useRoomContext = () => {
    return useContext(RoomContext) as IRoomContext;
}