import { Action, Reducer } from 'redux';
import { AuthLoginResponse, AuthLoginRequest } from '../types/AuthType';
import { accountAuthenticateApi } from '../apis/AuthApi';
// STATE - This defines the type of data maintained in the Redux store.
// export interface AuthState {
//     id: string;
//     userName: string;
//     email: string;
//     roles: string[];
//     isVerified: boolean;
//     jwToken: string;
//     isLoggingIn: boolean;
// }

// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
export interface UpdateUserInfoAction {
    type: 'UPDATE_USER_INFO';
    userInfo: AuthLoginResponse;
}

export interface LoginAction {
    type: 'LOGIN';
    userInfo: AuthLoginResponse;
}

export interface LogoutAction {
    type: 'LOGOUT';
}

// Declare a 'discriminated union' type.
export type AuthAction = UpdateUserInfoAction | LoginAction | LogoutAction;

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
export const authActionCreators = {
    updateUserInfo: (userInfo: AuthLoginResponse) => ({ type: 'UPDATE_USER_INFO', userInfo } as UpdateUserInfoAction),
    login: async (request: AuthLoginRequest): Promise<LoginAction | AuthLoginResponse> => {
        const response = await accountAuthenticateApi(request);
        return { type: 'LOGIN', userInfo: response } as LoginAction | AuthLoginResponse;
    },
    logout: () => ({ type: 'LOGOUT' } as LogoutAction),
};

// REDUCER - For a given state and action, returns the new state.
export const reducer: Reducer<AuthLoginResponse> = (state: AuthLoginResponse | undefined, action: Action): AuthLoginResponse => {
    if (state === undefined) {
        return {
            id: '',
            userName: '',
            email: '',
            roles: [],
            isVerified: false,
            jwToken: '',
            isLoggingIn: false
        };
    }

    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return { ...state, ...((action as UpdateUserInfoAction).userInfo) };
        case 'LOGIN':
            const newState = { ...state, ...((action as LoginAction).userInfo), isLoggingIn: true };
            localStorage.setItem('authState', JSON.stringify(newState));
            return newState;
        case 'LOGOUT':
            localStorage.removeItem('authState');
            return {
                id: '',
                userName: '',
                email: '',
                roles: [],
                isVerified: false,
                jwToken: '',
                isLoggingIn: false
            };
            
        default:
            return state;
    }
};