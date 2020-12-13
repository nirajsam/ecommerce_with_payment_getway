import React,{ useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
//import data from '../data'
import {Link} from 'react-router-dom'
//import axios from 'axios'
import Cookie from 'js-cookie';
import { listProducts } from '../actions/productActions';
const config= require('../config')
const dotenv = require('dotenv')
const URL = config.BACKEND_URL
const url = config.FRONTEND_URL
function HomeScreen(props) {
    //const [products,setProduct]=useState([]);
    const productList=useSelector((state)=> (state.productList));
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    const selProduct = sessionStorage.getItem('sData') 
    var selProducts = JSON.parse(selProduct)
    //var userName=localStorage.getItem('name')
    
    let x=`${new Date().getDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`
    console.log(x)
    useEffect(()=>{
      // const fetchData=async ()=>{
      //   const {data}=await axios.get("http://localhost:5000/api/products");
      //   console.log(data)
      //   setProducts(data)
      // }
      //fetchData();
      dispatch(listProducts())
      
      return ()=>{
        //
      };
      },[])
      console.log(sessionStorage.getItem('category'))
    return loading ? <div>loading..</div>:
    error ? <div>{error}</div>:
    selProducts ? 
    // <button onClick={reload}>reload</button>
    <div>
      {sessionStorage.getItem('category')==null?
      <div className="details-image corosel" style={{justifyContent:"center"}}>
                    {/* {product.image?<img src={`${url}/${product.image[0]}`} alt="product"></img>:null} */}
                    <div id="myCarousel" className="carousel slide" data-ride="carousel" >
    
                        <ol class="carousel-indicators">
                        {/* <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li> */}
                        </ol>

                        {/* Wrapper for slides */}
                        <div class="carousel-inner">
                        <div class="item active">
                          <img src="https://img.freepik.com/free-photo/girl-holds-fashion-shopping-bag-beauty_1150-13673.jpg?size=626&ext=jpg" id="img1" alt="product"></img>
                        </div>

                        <div class="item">
                          <img src="https://www.kotak.com/content/dam/Kotak/product_card_images/how-credit-cards-enhance-your-shopping-experience.jpg" id="img1" alt="product"></img>
                        </div>
                        
                        <div class="item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-nGibahXoR93_Ul_FZAqdglyD6TOFxx5dKA&usqp=CAU" id="img1" alt="product"></img>
                        </div>
                        </div>

                        {/* Left and right controls */}
                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        {/* <span class="sr-only">Previous</span> */}
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        {/* <span class="sr-only">Next</span> */}
                        </a>
                    </div>
                    
                </div>:null}
    <ul className="products">
      {
        selProducts.map(product => 
          <li key={product._id}>
            <div className="product">
              <Link to={'/home/product/'+product._id}>
                <img className="product-image" src={`${url}/${product.image[0]}`} alt="product1"></img>
              </Link>
                
        <div className="product-name">
            <Link to={'/home/product/'+product._id}>{product.name}</Link></div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">Rs {product.price}</div>
                {/* <div className="product-rating">{product.rating} stars({product.numReview} reviews)</div> */}
            </div>
        </li>)
      }  
    </ul></div>:
    <div>
      {sessionStorage.getItem('category')==null?
     <div className="details-image corosel" style={{justifyContent:"center"}}>
                    {/* {product.image?<img src={`${url}/${product.image[0]}`} alt="product"></img>:null} */}
                    <div id="myCarousel" className="carousel slide" data-ride="carousel" >
    
                        <ol class="carousel-indicators">
                        {/* <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li> */}
                        </ol>

                        {/* Wrapper for slides */}
                        <div class="carousel-inner">
                        <div class="item active">
                          <img src="https://img.freepik.com/free-photo/girl-holds-fashion-shopping-bag-beauty_1150-13673.jpg?size=626&ext=jpg" id="img1" alt="product"></img>
                        </div>

                        <div class="item">
                          <img src="https://www.kotak.com/content/dam/Kotak/product_card_images/how-credit-cards-enhance-your-shopping-experience.jpg" id="img1" alt="product"></img>
                        </div>
                        
                        <div class="item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-nGibahXoR93_Ul_FZAqdglyD6TOFxx5dKA&usqp=CAU" id="img1" alt="product"></img>
                        </div>
                        </div>

                        {/* Left and right controls */}
                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        {/* <span class="sr-only">Previous</span> */}
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        {/* <span class="sr-only">Next</span> */}
                        </a>
                    </div>
                    
                      </div>:null }
    <ul className="products">
    {
      products.map(product => 
        <li key={product._id}>
          <div className="product">
            <Link to={'/home/product/'+product._id}>
              <img className="product-image" src={`${url}/${product.image[0]}`} alt="product1"></img>
            </Link>
              
      <div className="product-name">
          <Link to={'/home/product/'+product._id}>{product.name}</Link></div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">Rs {product.price}</div>
              {/* <div className="product-rating">{product.rating} stars({product.numReview} reviews)</div> */}
          </div>
      </li>)
    }  
  </ul></div>

}

export default HomeScreen;