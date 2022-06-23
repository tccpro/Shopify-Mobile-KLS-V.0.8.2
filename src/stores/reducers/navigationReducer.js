
import { SET_EVENT_TITLE, SET_ARTIST_TITLE } from '../actions/actionType';
const initState = {
    eventTitle: [],
	artistTitle: []
}
   
const navigationReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_EVENT_TITLE:
			return {...state, eventTitle: action.payload}
		case SET_ARTIST_TITLE:
			return {...state, artistTitle: action.payload}
		default:
			return state
	}
}

export default navigationReducer;