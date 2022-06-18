import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Auth } from './auth';
import { User } from './users';
import { Health } from './health';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            user: User,
            health: Health
        }),
        applyMiddleware(thunk, logger)
    );

    return {store};
}