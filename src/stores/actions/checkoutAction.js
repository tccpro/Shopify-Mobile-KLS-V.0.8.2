import {SET_CART_ITEM_LENGTH, CREATE_CHECKOUT, ADD_ITEM_CART} from './actionType';

const cartItemLength = itemLength => {
    return {
        type: SET_CART_ITEM_LENGTH,
        payload: itemLength
    }
}

const createCheckout = checkout => {
    return {
        type: CREATE_CHECKOUT,
        payload: checkout
    }
}

const addItemCart = addLineItem => {
    return {
        type: ADD_ITEM_CART,
        payload: addLineItem
    }
}

export default {cartItemLength, createCheckout, addItemCart}