
import { GET_ALL_PRODUCTS, GET_CONCERT_PRODUCTS, GET_SELECTED_PRODUCTS } from '../actions/actionType';
const initState = {
	products: [],
	concertProducts: [],
	selectedProducts: []
}
   
const productReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {...state, products: action.payload}
		case GET_CONCERT_PRODUCTS:
			return {...state, products: action.payload}
		case GET_SELECTED_PRODUCTS:
			return {...state, selectedProducts: action.payload}
		default:
		return state
	}
}

export default productReducer;