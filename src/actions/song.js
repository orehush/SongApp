import {
    GET_SONG_REQUEST,
    GET_SONG_SUCCESS,
    GET_SONG_ERROR
} from './const';
import { SongDBHelper } from '../utils/db';

export const fetchRandomSongRequest = () => ({ type: GET_SONG_REQUEST });
export const fetchRandomSongError = () => ({ type: GET_SONG_ERROR });
export const fetchRandomSongSuccess = (payload) => ({ type: GET_SONG_SUCCESS, payload });
export const fetchRandomSong = () => (dispatch) => {
    dispatch(fetchRandomSongRequest());
    SongDBHelper.fetchRandomSong().then(result => {
        dispatch(fetchRandomSongSuccess(result));
    }).catch(err => dispatch(fetchRandomSongError()));
};
