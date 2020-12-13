import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/checkoutSteps';
import Cookie from 'js-cookie';

function PaymentScreen(props){

    const [paymentMethod, setPaymentMethod] = useState('');
    
    
    
    const dispatch = useDispatch();
    
    

    const submitHandler=(e)=>{
        e.preventDefault()
        Cookie.set('payment',paymentMethod)
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder')
    }
    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
    
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Payment</h2>
                </li>
                
                <li>
                    <div>
                    <input type="radio" name="paymentMethod" id="paymentMethod" value="paytm"
                    onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="paymentMethod">Paytm</label>
                    <input type="radio" name="cod" id="cod" value="cod"
                    onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="cod">cash on delivery</label>
                    </div>
                </li>
                <li>
                    <button type="submit" className="button primary"> Continue</button>
                </li>
                
        
            </ul>
        </form>
    </div>
    </div>
}
export default PaymentScreen;