import { axiosInstance } from './base.service';

export const getConfig = () => {
    return axiosInstance.get<{ show_limit: number }>('config');
}