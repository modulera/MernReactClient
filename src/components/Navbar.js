import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout, useAuthState, useAuthDispatch } from '../context/auth';
import routes from '../config/routes';

const Navbar = (props) => {
    const { loading, isAuthenticated, accessToken, ...rest } = useAuthState()
    // console.log(rest);

    const history = useHistory();
    const dispatch = useAuthDispatch()

    const handleLogout = (e) => {
        e.preventDefault()

        logout(dispatch) //call the logout action
        history.push('/signin') //navigate to logout page on logout
    }

    const authLinks = (
        <>
            <ul className="navbar-nav mr-auto">
                {routes.filter(item => item?.title && item.isVisible && (item.isPrivate === true || item.multiple === true))
                    .sort((a, b) => a.priority - b.priority)
                    .map((route, key) => (
                        <li className="nav-item" key={key}>
                            <NavLink className="nav-link" exact to={route.path}>{route.title}</NavLink>
                        </li>
                    ))}
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
                {routes.filter(item => item?.title && item.isVisible && (item.isPrivate === false || item.multiple === true))
                    .sort((a, b) => a.priority - b.priority)
                    .map((route, key) => (
                        <li className="nav-item" key={key}>
                            <NavLink className="nav-link" exact to={route.path}>{route.title}</NavLink>
                        </li>
                    ))}
            </ul>
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to='/signin'>Login</NavLink>
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
                {accessToken ? authLinks : guestLinks}
                {/* {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>} */}
            </div>
        </nav>
    );
};


export default Navbar;