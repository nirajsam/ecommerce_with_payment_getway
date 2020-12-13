import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Cookie from 'js-cookie';
//import data from './data'
import {BrowserRouter,Route,Link, Redirect,Switch} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/signinScreen';
import { useSelector } from 'react-redux';
import registerScreen from './Screens/registerScreen';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/shippingScreen';
import PaymentScreen from './Screens/paymentScreen';
import PlaceOrderScreen from './Screens/placeOrderScreen';
import Axios from 'axios';
const config= require('./config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
// let URL = "http://localhost:5000"
function App(props) {
    const [check, setcheck] = React.useState(false)
    const [sort, setsort] = React.useState("N")
    const [pname, setpname] = React.useState("")
    const [min, setmin] = React.useState(0)
    const [max, setmax] = React.useState(100000)
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const openMenu=()=>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu=()=>{
    document.querySelector(".sidebar").classList.remove("open")
  }
  const findProduct = (obj) =>{
    Axios.get(`${URL}/api/products/findP/${obj}`)
        .then((response) => {
            console.log(response)
            var newArray = response.data.filter(function (el) {
              return el.price <= max &&
                     el.price >= min           
            });
            sessionStorage.setItem('sData',JSON.stringify(newArray))
            sessionStorage.setItem('category',obj)
            console.log(sessionStorage.getItem('sData'))
            console.log(sessionStorage.getItem('category'))
            window.location.reload(true)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else {
                // 
                console.log(error)
            }

        })
  }
  const searchObj = (obj) =>{
    console.log(obj)
    console.log(sort)
    Axios.get(`${URL}/api/products/selectP/${obj}/${sort}`)
        .then((response) => {
            console.log(response)
            var newArray = response.data.filter(function (el) {
              return el.price <= max &&
                     el.price >= min           
            });
            sessionStorage.setItem('sData',JSON.stringify(newArray))
            sessionStorage.setItem('category',obj)
            console.log(sessionStorage.getItem('sData'))
            console.log(sessionStorage.getItem('category'))
            window.location.reload(true)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else {
                // 
                console.log(error)
            }

        })
  }
  const logOut = () =>{
      if(window.confirm("want to logout?? note: you should be on home page to logout!")){
        Cookie.remove('userInfo')
        window.location.reload()
      }
      
  }
  
  return (
    <BrowserRouter>
    <div >
      <div className="grid-container" >
        {/* <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <a onClick={()=>{sessionStorage.clear();
                    window.location.reload(true)}}><Link to="/home" >shop</Link></a>
                
            </div>
            
            <div className="header-links" >
                
                {userInfo?<Link to="/home/product/cart">Cart</Link>:null}{'  '}
                {userInfo?userInfo.isAdmin?<><Link to="/home/products"> AddProducts </Link><>  Seller-</></>:null:null}
                {
                  userInfo? <><Link to="/home/profile">{userInfo.name.slice(0,6)}</Link><button style={{color:"black",backgroundColor:"yellow",borderRadius:"20%"}} onClick={logOut}>Logout</button></>:
                  <Link to="/home/signin">Signin</Link>
                }
            </div>
        </header> */}
        <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span> 
                               
      </button>
      <div className="brand" >
                <button onClick={openMenu} style={{marginTop:"10px"}}>
                    &#9776;
                </button>
                <a onClick={()=>{sessionStorage.clear();
                    window.location.reload(true)}}><Link to="/home" style={{marginTop:"10px"}} >Niraj-shop</Link></a>{"      "}
                <span className="search-container center" style={{overflowX:"auto"}}>
            
              <input type="text" placeholder="Search.." name="search" id="searchB" 
              onChange={(event)=>{return setpname(event.target.value)}}></input>
              <button type="button" className="glyphicon glyphicon-search"onClick={()=>{return findProduct(pname)}}></button>
              </span>
              
            </div>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar" >
      <ul class="nav navbar-nav navbar-right">
        <li>
        {userInfo?<Link to="/home/product/cart" className="glyphicon glyphicon-shopping-cart" 
        style={{marginBottom:"0px",fontSize:"2.5rem"}} id="nLink">Cart</Link>:null}
        </li>   
        <li>{
                  userInfo?userInfo.isAdmin?<Link to="/home/profile" id="nLink" style={{marginTop:"7px",fontSize:"2rem"}}>seller-{userInfo.name}</Link>:
                  <Link to="/home/profile" id="nLink" style={{marginTop:"7px",fontSize:"2rem"}}>{userInfo.name}</Link>:
                  null
                }
        </li>
        <li>{userInfo?userInfo.isAdmin?<Link to="/home/products" style={{marginTop:"7px",fontSize:"2rem"}} id="nLink"> AddProducts </Link>:null:null}</li>
        <li>{
                  userInfo? <Link  id="nLink" style={{marginTop:"5px",
                    fontSize:"2rem",cursor:"pointer"}}><span  className="glyphicon glyphicon-log-out"onClick={logOut}>Logout</span></Link>:
                  <Link to="/home/signin" className="glyphicon glyphicon-user">Signin</Link>
                }</li>
      </ul>
    </div>
  </div>
</nav>

        <aside className="sidebar" style={{backgroundColor:"white",position:"absolute","z-index":"1"}}>
            <h4>Filter Products</h4>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>price:
                <li>
                    low-high <input type="checkbox"  value="asc" onChange={(e)=>{setcheck(!check);
                    ;setsort(e.target.value);}} />
                </li>
                <li>
                   high-low <input type="checkbox"  value="des" onChange={(e)=>{setcheck(!check);
                    setsort(e.target.value)}}/>
                </li>
                </ul>
                <div className="row">
                  <ul>
                <li>
                    <label htmlFor="min">minimum price</label><br/>
                    <input type="Number" name="min" className="col-md-4 col-xs-4 col-sm-4" onChange={(e)=>{return setmin(e.target.value)}}   /><br/>
                </li><br/><br/>
                <li>
                    <label htmlFor="max">maximum price </label><br/>
                   <input type="Number"name="max" className="col-md-4 col-xs-4 col-sm-4"  onChange={(e)=>{return setmax(e.target.value)}}  />
                </li>
                </ul>
                </div>
            
        </aside>
        <main className="main" style={{justifyContent:"center"}}>
            <div class="flex-container" style={{display:"flex",cursor:"pointer",overflowX:"auto"}}>
                <div className="col-md-3 text-center" style={{backgroundColor:"blue",color:"white"}}><span onClick={()=>searchObj("shirt")} >Shirt</span></div>
                <div className="col-md-3 text-center " style={{backgroundColor:"blue",color:"white"}}><span onClick={()=>searchObj("pant")} >Pants</span></div>
                <div className="col-md-3 text-center" style={{backgroundColor:"blue",color:"white"}}><span  onClick={()=>searchObj("saree")}>saree</span></div>
                <div className="col-md-3 text-center" style={{backgroundColor:"blue",color:"white"}}><span  onClick={()=>searchObj("top")}>top</span></div>
            </div>`
            
            
            <div className="content">
              {/* <Route path="/upload" component={FileUpload}/> */}
              <Route path={"/home/products"}component={userInfo?userInfo.isAdmin?ProductsScreen:null:null}/>
              <Route path="/home/shipping/"component={ShippingScreen}/>
              <Route path="/home/payment"component={PaymentScreen}/>
              <Route path="/home/placeorder/:ord?"component={PlaceOrderScreen}/>
              <Route path="/home/signin"  component={SigninScreen}/>
              <Route path="/home/register"  component={registerScreen}/>
              <Switch>
              <Route path="/home/product/cart/:id?" exact={true} component={CartScreen}/>
              <Route path={"/home/product/:id"} exact={true} component={userInfo?ProductScreen:SigninScreen}/>
              </Switch>
              <Route path="/home" exact={true} component={HomeScreen}/>
              <Route path="/" exact={true}><Redirect to="/home"></Redirect></Route>
                
            </div>
            
        </main>
        <footer className="footer">
            All rights reserved
        </footer>
    </div></div>
    </BrowserRouter>
  )
}

export default App;
