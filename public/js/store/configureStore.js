import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './../reducers/combine';
//middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default function configureStore(preloadedState) {
    const middleware = [ thunk, logger() ]

    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middleware)
    )

    return store
}
