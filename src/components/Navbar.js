import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout, useAuthState, useAuthDispatch } from '../context/auth';

const Navbar = (props) => {
    const { loading, isAuthenticated } = useAuthState()

    const history = useHistory();
    const dispatch = useAuthDispatch()

    const handleLogout = (e) => {
        e.preventDefault()

        logout(dispatch) //call the logout action
        history.push('/login') //navigate to logout page on logout
    }

    const authLinks = (
        <>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/dashboard'>Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/posts'>Posts</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/uploads'>Uploads</NavLink>
                </li>
            </ul>
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <a className='nav-link' onClick={handleLogout} href='#!'>Logout</a>
                </li>
            </ul>
        </>
    );

    const guestLinks = (
        <>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/'>Home</NavLink>
                </li>
            </ul>
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/login'>Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/signup'>Sign Up</NavLink>
                </li>
            </ul>
        </>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>AppName</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
            </div>
        </nav>
    );
};


export default Navbar;