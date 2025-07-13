// Third party
import axios, { AxiosError, AxiosResponse } from 'axios';

// Custom
import { baseUrl } from './index';

interface DecryptRequest {
    text: string;
}

interface DecryptResponse {
    rot: number;
    matches: number;
    result: string;
    language: string;
    language_code: string;
    percentage: number;
}

interface DecryptError {
    message: string;
}

export default async ({ text }: DecryptRequest): Promise<DecryptResponse> => {
    try {
        const response: AxiosResponse<DecryptResponse> = await axios.post(
            `${baseUrl}/decrypt`,
            { text }
        );

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError<DecryptError> = error;

            throw axiosError.response?.data.message;
        }

        throw error instanceof Error ? error.message : String(error);
    }
};
