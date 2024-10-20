
import axios, { AxiosResponse } from 'axios';

interface EncryptRequest {
    text: string;
    rot: number;
}

interface EncryptResponse {
    encrypted_text: string;
}

export default async ({text, rot}: EncryptRequest): Promise<EncryptResponse> => {
    const response: AxiosResponse<EncryptResponse> = await axios.post('/encrypt', { text, rot });

    return response.data;
}