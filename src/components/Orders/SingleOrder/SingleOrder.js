import React from 'react'
import { INGRIDENT_PRICES } from '../../../redux/reducer';

const SingleOrder = (props) => {
  
  const ingredientSummary = props.order.ingredients.map((item)=>{
    return (
      <p style={{
        border: '1px solid grey',
        borderRadius: '5px',
        marginRight: '10px',
        padding: '5px',
        display: 'inline-block',
        textAlign: 'center'
    }} key={item.type}>{item.amount}x <span style={{textTransform: 'capitalize'}}>{item.type} </span><b style={{margin: 'auto', display: 'block'}}>Price: {item.amount * INGRIDENT_PRICES[item.type]} BDT</b></p>
      )
  })
  return (
    <div style={{
        border: '1px solid grey',
        boxShadow: '1px #888888',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '10px'
    }}>
        <p>Order Number: {props.order.id}</p>
        <hr />
        <span>Phone Number: <b>{props.order.customer.phone} </b> || </span>
        <span> Delivery Address: <b>{props.order.customer.deliveryAddress}</b></span>
        <hr />
        { ingredientSummary }
        <hr />
        <p>Total: {props.order.price} BDT</p>
    </div>
  )
}

export default SingleOrder