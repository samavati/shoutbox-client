import { createContext, useContext } from "react";
import { IUser } from "../model/User";

interface IUserContext {
    user: IUser | null;
    setUser: (user: IUser) => void
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
    return useContext(UserContext);
}