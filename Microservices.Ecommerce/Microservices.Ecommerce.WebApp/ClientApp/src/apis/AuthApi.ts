// fetch method post to call the /api/account/authenticate endpoint
// payload is interface AuthLoginRequest
// response is interface AuthLoginResponse
import { ApiResponse } from '../types/ResponseType';
import { AuthLoginResponse, AuthLoginRequest } from '../types/AuthType';

export const accountAuthenticateApi = async (payload: AuthLoginRequest): Promise<ApiResponse<AuthLoginResponse>> => {
    const response = await fetch('/api/account/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to authenticate');
    }

    return await response.json();
};