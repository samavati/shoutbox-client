import { IUser } from '../model/User';
import { axiosInstance } from './base.service';

export const getAllUsers = () => {
    return axiosInstance.get<IUser[]>('users/list');
}

export const joinUser = (name: string, socketId: string) => {
    return axiosInstance.post<IUser & { IP: string, user_agent: string }>('users/join', { name, socketId })
}