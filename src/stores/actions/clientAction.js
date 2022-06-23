import {SET_CLIENT_CREATED} from './actionType';

const createClient = client => {
    return {
        type: SET_CLIENT_CREATED,
        payload: client
    }
}

export default {createClient}