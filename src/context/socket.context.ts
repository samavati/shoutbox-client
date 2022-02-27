import { createContext, useContext } from "react";
import socketio, { Socket } from "socket.io-client";

export const socket = socketio(process.env.REACT_APP_SERVER_URL as string);
export const SocketContext = createContext<Socket>({} as Socket);

export const useSocket = () => {
    return useContext(SocketContext);
}