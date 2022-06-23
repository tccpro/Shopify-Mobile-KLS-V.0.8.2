import {SIGNOUT_CUSTOMER, SIGNIN_CUSTOMER, GOOGLE_SIGNIN, GOOGLE_SIGNOUT} from './actionType';
import { AsyncStorage } from 'react-native';

const signin_customer = (param) => {
    async () => {
        await AsyncStorage.setItem('__userData', JSON.stringify({
            token : param.token,
            email: param.email,
            pass: param.pass,
            expiresAt : param.expiresAt,
            is_google: param.is_google?param.is_google:false
        }));
    }
    
    return {
        type: SIGNIN_CUSTOMER,
        token : param.token,
        email: param.email,
        expiresAt : param.expiresAt,
        is_google: false
    }
}

const signout_customer = () => {
    async () => {
        await AsyncStorage.removeItem('__userData');
    }
    
    return {
        type: SIGNOUT_CUSTOMER
    }

}

const google_signin = () => {

}

export default {signout_customer, signin_customer}