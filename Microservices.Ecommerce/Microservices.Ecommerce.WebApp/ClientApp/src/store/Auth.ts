import { Action, Reducer } from 'redux';
import { AuthLoginResponse, AuthLoginRequest } from '../types/AuthType';
import { accountAuthenticateApi } from '../apis/AuthApi';
import { actionCreators as toastActionCreators } from './Toast';

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
    login: (request: AuthLoginRequest) => async (dispatch: any): Promise<LoginAction | AuthLoginResponse> => {
        try {
            const response = await accountAuthenticateApi(request);
            dispatch(toastActionCreators.showToast({ message: response.message || '', type: 'success' }));
            const userInfo = { ...response.data, isLoggingIn: true };
            dispatch({ type: 'LOGIN', userInfo } as LoginAction | AuthLoginResponse);
            return response.data; // Return the response
        }
        catch (error) {
            dispatch(toastActionCreators.showToast({ message: 'Failed to authenticate', type: 'error' }));
            const emptyUserInfo = { id: '', userName: '', email: '', roles: [], isVerified: false, jwToken: '', isLoggingIn: false };
            dispatch({ type: 'LOGIN', userInfo: emptyUserInfo } as LoginAction | AuthLoginResponse);
            
            return emptyUserInfo; // Return the empty user info
        }
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
            const newState = { ...state, ...((action as LoginAction).userInfo)};
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