
import axiosConfig from './AxiosConfig';

const BaseURL: string = "https://localhost:3000"

interface ApiData {
    message: String;
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