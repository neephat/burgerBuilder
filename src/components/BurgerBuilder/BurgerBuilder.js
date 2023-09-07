import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Summary from './Summary/Summary';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators';

const mapStateToProps = (state)=>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addIngredient: (igType)=> dispatch(addIngredient(igType)),
        removeIngredient: (igType)=> dispatch(removeIngredient(igType)),
        updatePurchasable: ()=> dispatch(updatePurchasable())
    }
}
document.title = `Burger-House`
class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }
    
    addIngredientHandle = (type)=> {
        this.props.addIngredient(type);
        this.props.updatePurchasable()
        
    }
    removeIngredientHandle = (type)=> {
        this.props.removeIngredient(type);
        this.props.updatePurchasable()
        
    }
    toggleModal = ()=>{
        this.setState({
            modalOpen: !this.state.modalOpen,
        })
    }
    handleCheckOut = ()=> {
        this.setState({
            onClickCheckout: true
        })
    }
    render() {
        return (
            <div>
                <div className='d-flex flex-md-row flex-column'>
                    <Burger ingredients={this.props.ingredients} />
                    <Controls addIngredientHandle={this.addIngredientHandle} toggleModal={this.toggleModal}
                    removeIngredientHandle={this.removeIngredientHandle} price={this.props.totalPrice}
                    purchasable={this.props.purchasable} 
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.handleCheckOut} style={{background: '#D70F64', borderColor: 'white'}}>Continue to checkout</Button>
                        <Button color='secondary' onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                
                {this.state.onClickCheckout && <Navigate to='/checkout' replace={true}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)