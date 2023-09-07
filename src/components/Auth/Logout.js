import React, { Component } from 'react'
import { logout } from '../../redux/authActionCreators'
import { connect } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

const mapDispatchTopProps = (dispatch)=>{
    return{
        logout: ()=> dispatch(logout())
    }
}
export class Logout extends Component {
    componentDidMount(){
        this.props.logout();
    }
  render() {
    return (
        
        <Routes>
            <Route path='/' element={<Navigate to="/" replace={true} />} />
        </Routes>
        
        
    )
  }
}

export default connect(null, mapDispatchTopProps) (Logout)