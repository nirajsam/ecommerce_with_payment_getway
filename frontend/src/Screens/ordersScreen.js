import React, { Component } from 'react'
import Axios from 'axios'
const config= require('../config')
const dotenv = require('dotenv')

dotenv.config();
const URL = config.BACKEND_URL
// const URL="http://localhost:5000"
export default class OrdersScreen extends Component {
    constructor(){
        super()
        this.state={
            orders:""
        }
    }
    
    componentWillMount(){
        Axios.get(`${URL}/api/orders`).then((response)=>{
            this.setState({orders:(response.data)})
            console.log(this.state.orders)
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                    <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Products</th>
                        <th>Address</th>
                        <th>payment Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.orders?this.state.orders.map((order,index)=>{
                      return <tr>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{JSON.stringify(order.products)}</td>
                        <td>{JSON.stringify(order.address)}</td>
                        <td>{order.paymentMode}</td>
                      </tr>
                    }):null}
                    </tbody>
                  </table>
                
            </div>
        )
    }
}

