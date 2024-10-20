import axios, { AxiosResponse } from 'axios';


interface JokeResponse {
    joke: string
    encrypted_joke: string;
}

export default async (): Promise<JokeResponse> => {
    const response: AxiosResponse<JokeResponse> = await axios.get('/dad_joke');

    return response.data;
}