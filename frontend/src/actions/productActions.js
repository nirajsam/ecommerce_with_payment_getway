import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, 
    PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_SUCCESS, } from "../constants/productConstants"
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants"
import axios from "axios";
const fs = require('fs')
const config= require('../config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
// const URL ="http://localhost:5000"

const listProducts =()=> async (dispatch)=>{
    //console.log("data")
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        
        const {data}=await axios.get(`${URL}/api/products`);
        
        //console.log("data")
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
    }
    catch (error){
        dispatch({type:PRODUCT_LIST_FAIL, payload:error.message})
    }
    
}

const saveProduct = (product) => async(dispatch, getState)=>{
    
    try {
        dispatch({type:PRODUCT_SAVE_REQUEST, payload:product});
        const { userSignin: {userInfo}} = getState();
        if(!product._id){
            const {data} =await axios.post(`${URL}/api/products`, product,{
                headers:{
                'Authorization': 'Bearer' + userInfo.token
            }});
            dispatch({type:PRODUCT_SAVE_SUCCESS, payload: data})    
        }else{
            const {data} =await axios.put(`${URL}/api/products/${product._id}`, product,{
            headers:{
            'Authorization': 'Bearer' + userInfo.token
        }});
        dispatch({type:PRODUCT_SAVE_SUCCESS, payload: data})
        }
        
        
    } catch (error) {
        dispatch({type:PRODUCT_SAVE_FAIL, payload: error.message})
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST, 
            payload: productId})
        const {data} = await axios.get(`${URL}/api/products/${productId}`);
        console.log(data)
        console.log(data.image)
        // sessionStorage.setItem('pImages',data.image)
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL, payload:error.message});

    }
}
const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo}}=getState();
        dispatch({type:PRODUCT_DELETE_REQUEST, 
            payload: productId})
        const {data} = await axios.delete(`${URL}/api/products/${productId}`,{
            headers: {
                Authorization: 'Bearer' + userInfo.token
            }
        });
        dispatch({type:PRODUCT_DELETE_SUCCESS, payload:data, success:true});
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message});

    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `${URL}/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };

export { listProducts, detailsProduct, saveProduct, deleteProduct, saveProductReview }