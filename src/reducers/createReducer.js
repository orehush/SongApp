import * as ActionTypes from '../actions/const';

export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		} else if (handlers.hasOwnProperty(ActionTypes.DEFAULT)) {
			return handlers[ActionTypes.DEFAULT](state, action);
		} else {
			return state
		}
	}
}
