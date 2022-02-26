import React from 'react';
import { createContext, useContext } from "react";
import { IUser } from "../model/User";

interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
    return useContext(UserContext) as IUserContext;
}