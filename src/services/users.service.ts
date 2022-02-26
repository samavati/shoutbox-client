import { IUser } from '../model/User';
import { axiosInstance } from './base.service';

export const getAllUsers = () => {
    return axiosInstance.get<IUser[]>('users/list');
}