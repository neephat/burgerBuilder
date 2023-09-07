import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Button, Form, Modal, ModalBody } from 'reactstrap'
import Spinners from '../Spinners/Spinners'
import { resetIngredients } from '../../redux/actionCreators'


const mapStateToProps = state =>{
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    token: state.token,
    userId: state.userId
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    resetIngredients: ()=> dispatch(resetIngredients())
  }
}
export class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery"
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: ""
  }
  goBack = ()=>{
    this.props.history.goBack('/')
  }
  inputChangeHandler = (event)=>{
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    })
  }

  submitHandler = ()=>{
    this.setState({
      isLoading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId
    }
    axios.post("https://burger-house-7c444-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth="+ this.props.token, order)
    .then((response)=> {
      if(response.status === 200){
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Order Placed Successfully"
        })
         this.props.resetIngredients()
      }
      else{
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something Went Worng! Please Order Again"
        })
      }
    })
    .catch((err)=> {
      this.setState({
        isLoading: false,
        isModalOpen: true,
        modalMsg: "Something Went Worng! Please Order Again"
      })
    })
    
  }
  handleGoBack = ()=>{
    this.setState({
      goBack: true
    })
  }
  
  render() {
    let form = <div>
      <h4 style={{border: '1px solid grey', boxShadow: '1px 1px #888888', borderRadius: '5px', padding:'20px'}}>Payment: {this.props.totalPrice} BDT</h4>
        <Form style={{border: '1px solid grey', boxShadow: '1px 1px #888888', borderRadius: '5px', padding:'20px'}}>
          <textarea name='deliveryAddress' onChange={(event)=> this.inputChangeHandler(event)} value={this.state.values.deliveryAddress} placeholder='Your Address' className='form-control'></textarea>
          <br />
          <input name='phone' onChange={(event)=> this.inputChangeHandler(event)} value={this.state.values.phone} placeholder='Your Phone Number' className='form-control'/>
          <br />
          <select name='paymentType' onChange={(event)=> this.inputChangeHandler(event)} value={this.state.values.paymentType} className='form-control'>
            <option value='Cash On Delivery'>Cash On Delivery</option>
            <option value='Bkash'>Bkash</option>
          </select>
          <br />
          <Button disabled={!this.props.purchasable} style={{background: '#D70F64', borderColor: 'white'}} onClick={this.submitHandler}>Place Order</Button>
          <Button color='secondary' className='ms-2' onClick={this.handleGoBack}>Cancel</Button>
        </Form>
        {this.state.goBack && <Navigate to='/' replace={true}/>}
    </div>
    return (
      <div>
        { this.state.isLoading ? <Spinners /> : form }

        <Modal isOpen={this.state.isModalOpen} onClick={this.handleGoBack} >
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)