
import { SIGNIN_CUSTOMER, SIGNOUT_CUSTOMER } from '../actions/actionType';

const initState = {
	auth_token : null,
    expiresAt : null,
    email : null,
    auth_state : false
}
   
const customerReducer = (state = initState, action) => {
	switch (action.type) {
		case SIGNIN_CUSTOMER:
			return {
                ...state, 
                auth_token : action.auth_token,
                expiresAt : action.expiresAt,
                email : action.email,
                auth_state : true
            }
		case SIGNOUT_CUSTOMER:
			return {
                ...state, 
                auth_token : null,
                expiresAt : null,
                email : null,
                auth_state: false
            }
		default:
		return state
	}
}

export default customerReducer;