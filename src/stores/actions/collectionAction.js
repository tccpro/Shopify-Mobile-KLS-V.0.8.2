import { GET_ALL_COLLECTIONS } from './actionType';

const getCollections = (collections) => {
  return {
    type: GET_ALL_COLLECTIONS,
    payload: collections
  }
}




export default {getCollections}