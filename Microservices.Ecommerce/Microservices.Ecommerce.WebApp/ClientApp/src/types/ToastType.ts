// types.ts
export interface ToastState {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
}

export interface ShowToastAction {
    type: 'SHOW_TOAST';
    payload: ToastState;
}

export interface HideToastAction {
    type: 'HIDE_TOAST';
}

export type ToastActionTypes = ShowToastAction | HideToastAction;