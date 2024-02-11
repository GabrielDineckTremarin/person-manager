
import { IPersonResponse } from '../Interfaces/IPersonResponse';
import axiosConfig from './AxiosConfig';

const BaseURL: string = "https://localhost:3000"

interface ApiData {
    message: string;
    success: boolean;
    data: any;
}

export const getPeopleList = async (): Promise<ApiData>  => {
        const response = await axiosConfig.get(`/Person/get-list-of-people/`);

        const apiData: ApiData = {
            message: response.data.message,
            success: response.data.success,
            data: response.data.data,
        };
        return apiData;
}

export const getPerson = async (id: string): Promise<ApiData>  => {
    const response = await axiosConfig.get(`/Person/get-person-by-id/${id}`);

    const apiData: ApiData = {
        message: response.data.message,
        success: response.data.success,
        data: response.data.data,
    };
    return apiData;
}

export const createPerson = async (person: IPersonResponse): Promise<ApiData>  => {
    const response = await axiosConfig.post(`/Person/create-person`, person);

    const apiData: ApiData = {
        message: response.data.message,
        success: response.data.success,
        data: response.data.data,
    };
    return apiData;
}

export const updatePerson = async (person: IPersonResponse): Promise<ApiData>  => {
    const response = await axiosConfig.put(`/Person/update-person`, person);

    const apiData: ApiData = {
        message: response.data.message,
        success: response.data.success,
        data: response.data.data,
    };
    return apiData;
}

export const deletePerson = async (personId: string): Promise<ApiData>  => {
    const response = await axiosConfig.delete(`/Person/delete-person/${personId}`);

    const apiData: ApiData = {
        message: response.data.message,
        success: response.data.success,
        data: response.data.data,
    };
    return apiData;
}