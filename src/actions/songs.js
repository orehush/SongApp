import {
    GET_SONG_REQUEST,
    GET_SONG_SUCCESS,
    GET_SONG_ERROR,

    GET_COLLECTIONS_LIST_REQUEST,
    GET_COLLECTIONS_LIST_SUCCESS,
    GET_COLLECTIONS_LIST_ERROR,

    GET_LETTERS_REQUEST,
    GET_LETTERS_SUCCESS,
    GET_LETTERS_ERROR,

    GET_SONG_LIST_REQUEST,
    GET_SONG_LIST_SUCCESS,
    GET_SONG_LIST_ERROR,

    INCREASE_FONT_SIZE,
    DECREASE_FONT_SIZE,
} from './const';
import { SongDBHelper } from '../utils/db';
import store from '../store/configureStore';

export const fetchSongRequest = () => ({ type: GET_SONG_REQUEST });
export const fetchSongError = () => ({ type: GET_SONG_ERROR });
export const fetchSongSuccess = (payload) => payload ? ({ type: GET_SONG_SUCCESS, payload }): ({ type: GET_SONG_ERROR });
export const fetchSong = (id) => (dispatch) => {
    dispatch(fetchSongRequest());
    SongDBHelper.fetchSongByID(id).then(result => {
        dispatch(fetchSongSuccess(result));
    }).catch(err => dispatch(fetchSongError()));
};

export const fetchSongByNumber = (collectionId, number) => (dispatch) => {
    dispatch(fetchSongRequest());
    SongDBHelper.fetchSongByNumber(collectionId, number).then(result => {
        dispatch(fetchSongSuccess(result));
    }).catch(err => dispatch(fetchSongError()));
};


export const fetchRandomSong = () => (dispatch) => {
    dispatch(fetchSongRequest());
    SongDBHelper.fetchRandomSong().then(result => {
        dispatch(fetchSongSuccess(result));
    }).catch(err => dispatch(fetchSongError()));
};


export const fetchCollectionsListRequest = () => ({ type: GET_COLLECTIONS_LIST_REQUEST });
export const fetchCollectionsListError = () => ({ type: GET_COLLECTIONS_LIST_ERROR });
export const fetchCollectionsListSuccess = (payload) => ({ type: GET_COLLECTIONS_LIST_SUCCESS, payload });
export const fetchCollectionsList = () => (dispatch) => {
    dispatch(fetchCollectionsListRequest());
    SongDBHelper.fetchCollectionsList().then(result => {
        dispatch(fetchCollectionsListSuccess(result));
    }).catch(err => dispatch(fetchCollectionsListError()));
};


export const fetchLettersRequest = () => ({ type: GET_LETTERS_REQUEST });
export const fetchLettersError = () => ({ type: GET_LETTERS_ERROR });
export const fetchLettersSuccess = (payload) => ({ type: GET_LETTERS_SUCCESS, payload });
export const fetchLetters = () => (dispatch) => {
    dispatch(fetchLettersRequest());
    SongDBHelper.fetchLetters().then(result => {
        dispatch(fetchLettersSuccess(result));
    }).catch(err => dispatch(fetchLettersError()));
};

export const fetchSongsRequest = () => ({ type: GET_SONG_LIST_REQUEST });
export const fetchSongsError = (error) => ({ type: GET_SONG_LIST_ERROR, error });
export const fetchSongsSuccess = (payload) => ({ type: GET_SONG_LIST_SUCCESS, payload });

export const fetchSongsByLetter = (letter) => (dispatch) => {
    dispatch(fetchSongsRequest());
    SongDBHelper.fetchSongsByLetter(letter).then(result => {
        dispatch(fetchSongsSuccess(result));
    }).catch(err => dispatch(fetchSongsError(err)));
};

export const fetchSongsByQuery = (query) => (dispatch) => {
    dispatch(fetchSongsRequest());
    SongDBHelper.fetchSongsByQuery(query).then(result => {
        dispatch(fetchSongsSuccess(result));
    }).catch(err => dispatch(fetchSongsError(err)));
};

export const nextSong = (params) => (dispatch) => {
    const { isRandomSong, isNumberNavigation } = params;
    const state = store.getState();
    const { song } = state.song;
    const number = parseInt(song.number);
    
    if (isRandomSong) {
        dispatch(fetchRandomSong());
        return;
    }
    if (isNumberNavigation) {
        dispatch(fetchSongByNumber(song.collectionId, number + 1));
        return;
    }
    
    const { songs } = state.songs;
    const index = songs.findIndex((el) => song.id == el.id);
    if (index >= 0 && songs[index + 1]) {
        dispatch(fetchSong(songs[index + 1].id));
        return;
    }
};

export const prevSong = (params) => (dispatch) => {
    const { isRandomSong, isNumberNavigation } = params;
    const state = store.getState();
    const { song } = state.song;
    const number = parseInt(song.number);
    
    if (isRandomSong) {
        dispatch(fetchRandomSong());
        return;
    }
    
    if (isNumberNavigation) {
        if (number > 1)
        dispatch(fetchSongByNumber(song.collectionId, number - 1));
        return;
    }
    
    const { songs } = state.songs;
    const index = songs.findIndex((el) => song.id == el.id);
    if (index > 0 && songs[index - 1]) {
        dispatch(fetchSong(songs[index - 1].id))
        return;
    }
};

export const increaseFontSize = () => (dispatch) => {
    dispatch({ type: INCREASE_FONT_SIZE });
}
export const decreaseFontSize = () => (dispatch) => {
    dispatch({ type: DECREASE_FONT_SIZE });
}
