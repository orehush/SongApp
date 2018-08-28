import { combineReducers } from 'redux'
import { songs } from './songs';
import { song } from './song';

export const initialState = {};

export const rootReducer = combineReducers({
    songs, 
    song,
});
