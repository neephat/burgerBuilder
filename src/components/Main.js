import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { Navigate, Route, Routes, } from 'react-router-dom';
import Checkout from './Orders/Checkout'
import Order from './Orders/Order'
import AuthForm from './Auth/AuthForm';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
import Logout from './Auth/Logout';

const mapStateToProps = (state)=>{
    return {
        token: state.token
    }
}
const mapDispatchTopProps = (dispatch)=>{
    return{
        authCheck: ()=> dispatch(authCheck()),
    }
}
class Main extends Component {
    componentDidMount(){
        this.props.authCheck();
    }
    render(){
    let routes = null;
    if (this.props.token === null) {
        routes = (
            <Routes>
                <Route path="/login" element={<AuthForm />} />
                <Route path="*" element={<Navigate to="/login" replace={true} />} />

            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path="/orders" element={<Order/>} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/" exact element={<BurgerBuilder/>} />
                <Route path="/logout/*" exact element={<Logout/>} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
                
            </Routes>
        )
    }
    return (
        <div>
            <Header />
            <div className="container">
                {routes}
                 
            </div>
        </div>
    )
    }
}

export default connect(mapStateToProps, mapDispatchTopProps) (Main);