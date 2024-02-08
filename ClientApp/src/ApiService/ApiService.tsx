import axios from "axios"

import { IPersonResponse } from "../Interfaces/IPersonResponse";
import axiosInstance from './AxiosConfig';

const BaseURL: string = "https://localhost:3000"

interface ApiData {
    message: String;
    success: boolean;
    data: any;
}

export const getPeopleList = async () => {
    try {
        const response = await axiosInstance.get(`/Person/get-list-of-people/`);
        return response
    }catch (err){
        console.log(err)
    }
        // console.log(response.data); // The data received from the API
};

