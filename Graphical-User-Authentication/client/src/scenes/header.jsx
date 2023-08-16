import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { signout } from '../actions/authActions';

const header = () => {

    const user = useSelector((state) => state.auth.user)
    const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout())
    }

    const renderLoggedIn = () => {
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                    <li className="nav-item"><a className="nav-link" style={{ color: 'Yellow' }}><b>{user.fullName}<PersonRoundedIcon /></b></a></li>
                    <li className="nav-item"><button style={{ backgroundColor: 'gray', borderStyle: 'none', borderRadius: '1rem', color: 'white' }}><a className="nav-link" href='/pwdRequest'>Reset Password</a></button></li>
                    <li className="nav-item"><button style={{ backgroundColor: 'gray', borderStyle: 'none', borderRadius: '1rem', color: 'white' }} onClick={logout}><a className="nav-link" >LogOut</a></button></li>
                </ul>
            </div>
        );
    }
    const renderNonLoggedIn = () => {
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="/authPage">Authorized Page</a></li>
                    <li className="nav-item"><button style={{ backgroundColor: 'gray', borderStyle: 'none', borderRadius: '1rem', color: 'white' }}><a className="nav-link" href='/signIn1'>SignIn</a></button></li>
                    <li className="nav-item"><button style={{ backgroundColor: 'gray', borderStyle: 'none', borderRadius: '1rem', color: 'white' }}><a className="nav-link" href='/signUp1'>SignUp</a></button></li>
                </ul>
            </div>
        );
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="#page-top"><img src={logo} alt="..." />Graphycal Authentication</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </button>
                    {authenticated ? renderLoggedIn() : renderNonLoggedIn()}
                </div>
            </nav></div>
    )
}

export default header