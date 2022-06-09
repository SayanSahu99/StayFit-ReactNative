import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth
        }),
        applyMiddleware(thunk, logger)
    );

    return {store};
}