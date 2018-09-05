import * as ActionTypes from '../../actions/const';
import createReducer from '../createReducer';

const initialState = {
    song: null,
    loading: false,
    isError: false,
    fontSize: 16
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
    },
    [ActionTypes.INCREASE_FONT_SIZE](state, action) {
        return {
            ...state,
            fontSize: state.fontSize >= 24 ? 24: state.fontSize + 2,
        }
    },
    [ActionTypes.DECREASE_FONT_SIZE](state, action) {
        return {
            ...state,
            fontSize: state.fontSize <= 12 ? 12: state.fontSize - 2,
        }
    },
 });
