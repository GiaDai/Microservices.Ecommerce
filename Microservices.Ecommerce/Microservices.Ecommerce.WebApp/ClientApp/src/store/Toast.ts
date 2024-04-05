import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ToastState {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface ShowToastAction { type: 'SHOW_TOAST'; payload: ToastState; }
export interface HideToastAction { type: 'HIDE_TOAST'; }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = ShowToastAction | HideToastAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    showToast: (payload: ToastState) => ({ type: 'SHOW_TOAST', payload } as ShowToastAction),
    hideToast: () => ({ type: 'HIDE_TOAST' } as HideToastAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ToastState> = (state: ToastState | undefined, incomingAction: Action): ToastState => {
    if (state === undefined) {
        return { message: '', type: 'info' };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SHOW_TOAST':
            return { message: action.payload.message, type: action.payload.type };
        case 'HIDE_TOAST':
            return { message: '', type: 'info' };
        default:
            return state;
    }
};