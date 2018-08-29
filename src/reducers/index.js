import { combineReducers } from 'redux'
import { songs } from './songs';
import { song } from './song';

export const rootReducer = combineReducers({
    song,
});
