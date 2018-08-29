import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist'
import { rootReducer } from '../reducers';


const isDev = process.env.NODE_ENV === "development";
let logger = createLogger({duration: false, timestamp: true, collapsed: false });


const enhancer = isDev ?
    compose(applyMiddleware(thunk, logger), devTools(), autoRehydrate())
    : compose(applyMiddleware(thunk), autoRehydrate());


const store = createStore(rootReducer, enhancer);

export default store;
