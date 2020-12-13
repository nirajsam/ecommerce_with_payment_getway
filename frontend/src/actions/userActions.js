import axios from 'axios';
import Cookie from 'js-cookie';

import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
const config= require('../config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
// let URL ="http://localhost:5000"
const signin = (email,password) => async(dispatch) => {
    dispatch({type:USER_SIGNIN_REQUEST, payload:{email, password}});
    try {
        
        const {data}  = await axios.post(`${URL}/api/users/signin`, {email, password});
        dispatch({type:USER_SIGNIN_SUCCESS, payload:data});
        Cookie.set('userInfo',JSON.stringify(data));
        console.log(Cookie.get('userInfo'))
        // if(data){
        //     localStorage.setItem('name',data.name)
        //     localStorage.setItem('mail',data.email)
        // }
        
        
    } catch (error) {
        dispatch({type:USER_SIGNIN_FAIL, payload:error.message});
    }
}

const register = (name, email,password) => async(dispatch) => {
    dispatch({type:USER_REGISTER_REQUEST, payload:{name, email, password}});
    try {
        const {data}  = await axios.post(`${URL}/api/users/register`, {name,email, password});
        dispatch({type:USER_REGISTER_SUCCESS, payload:data});
        // Cookie.set('userInfo',JSON.stringify(data));
        console.log(Cookie.get('userInfo'))
        
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL, payload:error.message});
    }
}
export {signin, register}