import React, { Component } from 'react'
import { fetchOrders } from '../../redux/actionCreators'
import { connect } from 'react-redux'
import SingleOrder from './SingleOrder/SingleOrder'
import Spinners from '../Spinners/Spinners'

const mapStateToProps = (state)=>{
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,
    token: state.token,
    userId: state.userId
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    fetchOrders: (token, userId)=> dispatch(fetchOrders(token, userId))
  }
}
export class Order extends Component {
  componentDidMount(){
    this.props.fetchOrders(this.props.token, this.props.userId)
  }
  componentDidUpdate(){
   
  }
  render() {
    let orders = null
    if(this.props.orderErr){
      orders = <p style={{
        border: '1px solid grey',
        boxShadow: '1px #888888',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '10px'
    }}>Sorry Failed to Load Orders!</p>
    }else{
      if(this.props.orders.length === 0){
        orders = <p style={{
          border: '1px solid grey',
          boxShadow: '1px #888888',
          borderRadius: '5px',
          padding: '20px',
          marginBottom: '10px'
      }}>You have no orders Orders</p>
      }else{
      orders = this.props.orders.map((order) =>{
        return <SingleOrder order={order} key={order.id}/>
      })
      }
    }
      
    return (
      <div>
        {this.props.orderLoading ? <Spinners /> : orders}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)