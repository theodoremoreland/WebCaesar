// Third party
import axios, { AxiosError, AxiosResponse } from 'axios';

// Custom
import { baseUrl } from './index';

interface JokeResponse {
    dad_joke: string;
    encrypted_dad_joke: string;
}

interface JokeError {
    message: string;
}

export default async (): Promise<JokeResponse> => {
    try {
        const response: AxiosResponse<JokeResponse> = await axios.get(
            `${baseUrl}/dad_joke`
        );

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError<JokeError> = error;

            throw axiosError.response?.data.message;
        }

        throw error instanceof Error ? error.message : String(error);
    }
};
