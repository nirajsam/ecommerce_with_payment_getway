import React,{useState, useEffect} from 'react';
//import data from '../data'
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsProduct } from '../actions/productActions';
import HoverRating from './starRating'
import axios from 'axios'
const config= require('../config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
const url = config.FRONTEND_URL
// const URL ="http://localhost:5000"
// const url="http://localhost:3000"
function ProductScreen(props) {
    //console.log(props.match.params.id)
    //const product = data.products.find(x=>x._id===props.match.params.id)
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const [qty, setQty] = useState(1)
    const [cRate, setcRate] = useState(0)
    const [Rate, setRate] = useState(0)
    const [Comment, setComment] = useState("")
    const [allComment, setallComment] = useState([])
    const [allusers, setallusers] = useState([])
    const [countComment, setcountComment] = useState(0)
    const productDetails = useSelector((state) => (state.productDetails))
    const {product, loading, error} = productDetails;
    const dispatch=useDispatch();
    

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        axios.post(`${URL}/api/comment/commentOn`,{productId:props.match.params.id,email:userInfo.email,comment:Comment})
            .then(response => {
                if (response) {
                    setComment("")
                    // props.refreshFunction(response.data.result)
                    console.log(response)
                } else {
                    alert('Failed to save Comment')
                }
                // window.location.reload()
            }).catch((error)=>{
                console.log(error)
            })
    }
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
        axios.get(`${URL}/api/rate/getRate/${props.match.params.id}`).then((response)=>{
            //console.log(response.data.rate.r)
            setcRate(response.data.countRate)
            setRate(response.data.rate)
            // setRate(response.data.rate)
        }).catch((error)=>{
            console.log(error)
        })
        axios.get(`${URL}/api/comment/getComment/${props.match.params.id}`).then((response)=>{
            console.log(response.data.commentData)
            let carray=[]
            for (let index = 0; index < response.data.commentData.length; index++) {
                carray.push(response.data.commentData[index].comment)    
            }
            let uarray=[]
            for (let index = 0; index < response.data.commentData.length; index++) {
                uarray.push(response.data.commentData[index].email.slice(0,3))    
            }
            console.log(carray)
            setallComment(carray)
            setallusers(uarray)
            setcountComment(response.data.countComment)
        }).catch((error)=>{
            console.log(error)
        })
        return () => {
            //
        }
    }, [])

    const handleAddCart = () => {
        props.history.push("cart/" +props.match.params.id +"?qty=" +qty)
    }
    //console.log(Rate)
    //console.log(cRate)
    if(!product){
        //
    }else{
        if(product.image){
            console.log(product.image[0])
        }
    }
    
    return (
        <div>
            <div className="back-to-result">
                {/* <Link to="/home">Back To result</Link> */}
            </div>
            {loading ? <div>loading...</div>:
            error? <div>{error}</div>:
            
            (
                <div className="details">
                <div className="details-image">
                    {/* {product.image?<img src={`${url}/${product.image[0]}`} alt="product"></img>:null} */}
                    <div id="myCarousel" class="carousel slide" data-ride="carousel" style={{width:"80%"}}>
    
                        <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>

                        {/* Wrapper for slides */}
                        <div class="carousel-inner">
                        <div class="item active">
                        {product.image?<img src={`${url}/${product.image[0]}`} alt="product" ></img>:null}
                        </div>

                        <div class="item">
                            {product.image?<img src={`${url}/${product.image[1]}`} alt="product"></img>:null}
                        </div>
                        
                        <div class="item">
                            {product.image?<img src={`${url}/${product.image[2]}`} alt="product"></img>:null}
                        </div>
                        </div>

                        {/* Left and right controls */}
                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        <span class="sr-only">Next</span>
                        </a>
                    </div>
                    
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {Rate} Stars ({cRate} Reviews) 
                        </li>
                        <li>
                            Price: <b>Rs {product.price}</b> 
                        </li>
                        <li>
                            Description
                            <div>
                                {product.Description}
                            </div> 
                        </li>
                        <li>
                            <HoverRating id={props.match.params.id} rate={Rate}/>{cRate}
                        </li>
                    </ul>
                    <ul>
                        <li><form style={{ display: 'flex' }} >
                        <textarea
                            style={{ width: '100%', borderRadius: '5px' }}
                            onChange={handleChange}
                            value={Comment}
                            placeholder="write some comments"
                        />
                        <br />
                        <button style={{ width: '15%', height: '42px' }} onClick={onSubmit}>
                        send
                        </button>
                    </form></li>
                    </ul>
                    <ul>
                        
                        <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">Comments {countComment}</button>
                        <div id="demo" class="collapse">
                            {allComment.map((com,index)=>{
                                return <li><b>{allusers[index]}: </b>{com}</li>
                            })}
                        </div>
                        
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price:{product.price}
                        </li>
                        <li>
                            Status:{product.countInStock>0? <div>In Stock</div>:<div>Out of Stock</div>}
                        </li>
                        <li>
                            Qty:<select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}> {x+1} </option>)}
                            </select>
                        </li>
                        <li>{product.countInStock>0 &&  <button onClick={handleAddCart} 
                        className="button">Add to cart</button>}
                            
                        </li>
                    </ul>
                </div>
            </div>
            )}
            
        </div>
    )
}

export default ProductScreen;