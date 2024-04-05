import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { ApplicationState, reducers } from './';

export default function configureStore(history: History, initialState?: ApplicationState) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    // Load state from localStorage
    // const savedState = localStorage.getItem('authState');
    // const persistedState = savedState ? JSON.parse(savedState) : initialState;

    // Load state from localStorage
    const savedState = localStorage.getItem('authState');
    if (savedState) {
        const persistedState = JSON.parse(savedState);
        initialState = {
            ...initialState,
            authentication: persistedState,
            counter: undefined, // Add this line
            weatherForecasts: undefined, // Add this line
            toast: undefined // Add this line
        };
    }

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
