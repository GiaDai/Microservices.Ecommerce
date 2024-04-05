// expose ToatWrapper component has props children
// use toast from react-toastify to display error message
// base on tost state from redux store to display success/error/warning/info message

import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import { ToastState } from '../store/Toast';
import { toast } from 'react-toastify';

interface ToastWrapperProps {
    children: React.ReactNode;
}

const ToastWrapper: React.FC<ToastWrapperProps> = (props) => {
    const toastState = useSelector<ApplicationState, ToastState | undefined>(state => state.toast); // Update the type of toastState

    if (toastState && toastState.message) { // Add a null check for toastState
        switch (toastState.type) {
            case 'success':
                toast.success(toastState.message);
                break;
            case 'info':
                toast.info(toastState.message);
                break;
            case 'warning':
                toast.warn(toastState.message);
                break;
            case 'error':
                toast.error(toastState.message);
                break;
        }
    }

    return <>{props.children}</>;
};

export default ToastWrapper;