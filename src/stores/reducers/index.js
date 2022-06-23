import { combineReducers } from 'redux';
import productReducer from './productReducer';
import collectionReducer from './collectionReducer';
import checkoutReducer from './checkoutReducer';
import navigationReducer from './navigationReducer';
import customerReducer from './customerReducer';

const reducers = combineReducers({
    product: productReducer,
    collection: collectionReducer,
    checkout: checkoutReducer,
    navigations: navigationReducer,
    auth: customerReducer
})

export default reducers
