export interface AuthLoginResponse {
    id: string;
    userName: string;
    email: string;
    roles: string[];
    isVerified: boolean;
    jwToken: string;
    isLoggingIn: boolean;
}

export interface AuthLoginRequest {
    email: string;
    password: string;
}