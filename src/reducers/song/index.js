import * as ActionTypes from '../../actions/const';
import createReducer from '../createReducer';

const initialState = {
    song: null,
    loading: false,
    isError: false,
}
  
export const song = createReducer(initialState, {
	[ActionTypes.GET_SONG_REQUEST](state, action) {
        return {
            ...state,
            loading: true,
            song: null,
            isError: false,
        }
    },
    [ActionTypes.GET_SONG_SUCCESS](state, action) {
        return {
            ...state,
            loading: false,
            song: action.payload
        }
    },
    [ActionTypes.GET_SONG_ERROR](state, action) {
        return {
            ...state,
            loading: false,
            song: null,
            isError: true
        }
    }
});
