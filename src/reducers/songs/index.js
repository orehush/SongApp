import * as ActionTypes from '../../actions/const';
import createReducer from '../createReducer';

const initialState = {
    loading: false,
    isError: false,
    collections: null,
    letters: null,
    songs: null,
}
  
export const songs = createReducer(initialState, {
	[ActionTypes.GET_COLLECTIONS_LIST_REQUEST](state, action) {
        return {
            ...state,
            loading: true,
            collections: null,
            isError: false,
        }
    },
    [ActionTypes.GET_COLLECTIONS_LIST_SUCCESS](state, action) {
        return {
            ...state,
            loading: false,
            collections: action.payload
        }
    },
    [ActionTypes.GET_COLLECTIONS_LIST_ERROR](state, action) {
        return {
            ...state,
            loading: false,
            collections: [],
            isError: true
        }
    },

    [ActionTypes.GET_LETTERS_REQUEST](state, action) {
        return {
            ...state,
            loading: true,
            letters: null,
            isError: false,
        }
    },
    [ActionTypes.GET_LETTERS_SUCCESS](state, action) {
        return {
            ...state,
            loading: false,
            letters: action.payload
        }
    },
    [ActionTypes.GET_LETTERS_ERROR](state, action) {
        return {
            ...state,
            loading: false,
            letters: [],
            isError: true
        }
    },

    [ActionTypes.GET_SONG_LIST_REQUEST](state, action) {
        return {
            ...state,
            loading: true,
            songs: null,
            isError: false,
        }
    },
    [ActionTypes.GET_SONG_LIST_SUCCESS](state, action) {
        return {
            ...state,
            loading: false,
            songs: action.payload
        }
    },
    [ActionTypes.GET_SONG_LIST_ERROR](state, action) {
        return {
            ...state,
            loading: false,
            songs: [],
            isError: true
        }
    },
});
