
import { SET_CART_ITEM_LENGTH, CREATE_CHECKOUT, ADD_ITEM_CART } from '../actions/actionType';
const initState = {
    cartLength: 0,
    cartItem: null,
	checkoutItem: ''
}
   
const checkoutReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_CART_ITEM_LENGTH:
			return {...state, cartLength: action.payload}
		case CREATE_CHECKOUT:
			return {...state, checkoutItem: action.payload}
		case ADD_ITEM_CART:
			return {...state, checkoutItem: action.payload}
		default:
			return state
	}
}

export default checkoutReducer;