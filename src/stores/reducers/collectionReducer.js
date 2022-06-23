
import { GET_ALL_COLLECTIONS } from '../actions/actionType';
const initState = {
    collections: [],
}
   
const collectionReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_ALL_COLLECTIONS:
			return {...state, collections: action.payload}
		default:
			return state
	}
}

export default collectionReducer;