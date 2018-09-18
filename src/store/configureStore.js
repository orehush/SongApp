import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist'
import { rootReducer } from '../reducers';


const isDev = process.env.NODE_ENV === "development";
let logger = createLogger({duration: false, timestamp: true, collapsed: false });


const enhancer = isDev ?
    compose(applyMiddleware(thunk, logger), devTools(), autoRehydrate())
    : compose(applyMiddleware(thunk), autoRehydrate());


const store = createStore(rootReducer, enhancer);

export const persist = persistStore(store, {
    storage: AsyncStorage,
});

export default store;
