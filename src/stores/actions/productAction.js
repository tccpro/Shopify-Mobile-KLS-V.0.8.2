import { GET_ALL_PRODUCTS, GET_CONCERT_PRODUCTS, GET_SELECTED_PRODUCTS } from './actionType';

const getProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: products
  }
}

const getConcertProducts = (products) => {
  return {
    type: GET_CONCERT_PRODUCTS,
    payload: products
  }
}

const getSelectedProducts = (products) => {
  return {
    type: GET_SELECTED_PRODUCTS,
    payload: products
  }
}

export default {getProducts, getConcertProducts, getSelectedProducts}