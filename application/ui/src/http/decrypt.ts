
import axios, { AxiosResponse } from 'axios';

interface DecryptRequest {
    text: string;
}

interface DecryptResponse {
    rot: number;
    matches: number;
    result: string;
    language: string;
    language_code: string;
}

export default async ({text}: DecryptRequest): Promise<DecryptResponse> => {
    const response: AxiosResponse<DecryptResponse> = await axios.post('/decrypt', { text });

    return response.data;
}