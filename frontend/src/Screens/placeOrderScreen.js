import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import Cookie from 'js-cookie';
import Axios from 'axios';
const config= require('../config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
const url = config.FRONTEND_URL
// let url ="http://localhost:3000"
function PlaceOrderScreen(props) {
  const [confirmOrder, setconfirmOrder] = React.useState("")
  const [pdt, setpdt] = React.useState("")
  const cart = useSelector(state => state.cart);
  const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

  const { cartItems, shipping, payment } = cart;
  
  console.log(Cookie.get('address'))
  console.log(props.match.params.ord)
  if(!Cookie.get('address')){
      props.history.push("/home/shipping")
  }else if(!Cookie.get('payment')){
    props.history.push("/home/payment")
  }else if(props.match.params.ord=="TXN_FAILURE"){
    props.history.push("/home/payment")
  }
  console.log(cartItems) 
  const itemsPrice = cartItems.reduce((a,c)=> a + c.price*c.qty,0);
  console.log(itemsPrice)
  const shippingPrice = itemsPrice>100? 0:10;
  const taxPrice = .15*itemsPrice;
  const totalPrice = itemsPrice+shippingPrice+taxPrice
  const dispatch = useDispatch();
  var Array={}
  var a={};
  const addPdt=()=>{
    cartItems.map((item,index) =>{Array[item.name]=item.qty;
    a[item.product]=item.qty})
    console.log(Array)
    console.log(a)
    placeOrderHandler(Array,a)
    
  }
  
    
  const placeOrderHandler=(ar,a)=>{
    Axios.post(`${URL}/api/orders`,{ids:a,name:userInfo.name,email:userInfo.email,productsAr:ar,address:{
      address:Cookie.get('address'),city:Cookie.get('city'),pcode:Cookie.get('pcode'),country:Cookie.get('country')}
    ,pMode:Cookie.get('payment')}).then((response)=>{
      console.log(response)
      setconfirmOrder("thank you for ordering... call me to track your order...")
      Cookie.remove("cartItems")
      Cookie.remove('address')
      Cookie.remove('city')
      Cookie.remove('pcode')
      Cookie.remove('country')
      Cookie.remove('payment')
    }).catch((error)=>{
      console.log(error)
    })
  }
  //to post value in paytm website

  const isDate=(val)=> {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }
  
  const isObj=(val) =>{
    return typeof val === 'object'
  }
  
  const stringifyValue=(val) =>{
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }
  
  const buildForm=({ action, params }) =>{
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
    // form.setAttribute('target', target)
  
    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params[key]))
      form.appendChild(input)
    })
  
    return form
  }
  
  const post=(details)=>{
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }
  //end

  const onPayment= async(e)=>{
    e.preventDefault();
    try {
      // var amount=totalPrice;
      var amount=1.00;
      var phone_number="+911234567890";
      var email=userInfo.email;
      var order_id=new Date().getTime();
      let params={
        orderId:order_id,
        email:email,
        amount:amount,
        phone_number:phone_number
      }
      var url=`${URL}/api/orders/payment`;
      var request={
        url:url,
        params:params,
        method:"get"
      }
      const response=await Axios(request);
      console.log(response)
      const processParams=await response.data;
      console.log(processParams)
      var details={
        action:"https://securegw-stage.paytm.in/order/process",
        params:processParams
      }
      post(details)
    

    } catch (error) {
      
    }
  }
  useEffect(() => {
    
  }, []);

//   const checkoutHandler = () => {
//     props.history.push("/signin?redirect=shipping");
//   }
  if(confirmOrder){
  return(<h1 className="text-center">{confirmOrder}</h1>)
  }else{
  return <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
  
  <div className="placeorder">
    <div className="placeorder-info">
        <div>
            <h3>Shipping</h3>
            <div>
            {/* {cart.shipping.address}, {cart.shipping.city},
            {cart.shipping.postalCode}, {cart.shipping.country} */}
            {Cookie.get('address')}, {Cookie.get('city')},
            {Cookie.get('pcode')}, {Cookie.get('country')}
        </div>
        </div>
        <div>
            <h3>Payment</h3>
            <div>
                Payment Method:{cart.payment.paymentMethod}
            </div>
        </div>
        <div>
        <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={`${url}/`+item.image[0]} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/home/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty:{item.qty}
                  </div>
                </div>
                <div className="cart-price">
                  Rs {item.price}
                </div>
              </li>
            )
        }
      </ul>
        </div>
      

    </div>
    <div className="placeorder-action">
        <ul>
            <li>
              {props.match.params.ord=="TXN_SUCCESS" || Cookie.get("payment")=="cod"?
              <button className="button primary full-width" onClick={addPdt}>Place Order</button>:null}
                
            </li>
            <li>
                <h3>Order Summary</h3>
            </li>
            <li>
                <div>Items</div>
                <div>Rs {itemsPrice}</div>
            </li>
            <li>
                <div>Shipping</div>
                <div>Rs {shippingPrice}</div>
            </li>
            <li>
                <div>Tax</div>
                <div>Rs {taxPrice}</div>
            </li>
            <li>
                <div>Order Total</div>
                <div>Rs {totalPrice}</div>
            </li>
            
        </ul>
        {Cookie.get("payment")!="cod"?props.match.params.ord!="TXN_SUCCESS"  && props.match.params.ord==undefined ?<button onClick={onPayment}>pay</button>:"paid":null}
      

    </div>

  </div></div>
}}

export default PlaceOrderScreen;