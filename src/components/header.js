import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';


export default function Header() {


    var access = localStorage.getItem('accessID');
    var accessName = localStorage.getItem('accessName');
    var accessEmail = localStorage.getItem('accessEmail');
    var accessImage = localStorage.getItem('accessImage');



    const logOut = () => {
        googleLogout();

        window.location.href = 'login';

        localStorage.clear();
    };

    useEffect(() => {
        if (access == null) {
            window.location.href = '/';
        }
    }, [])

    return (
        <>
            <div className='row p-2 d-flex' style={{ borderBottom: '1px solid #c1c1c1' }}>
                <div className='col-sm-8 col-md-4 col-lg-4 col-xl-8'>
                    <h3 className='justify-content-left '>E-Commerce</h3>
                </div>
                <div className='col-sm-4 col-md-8 col-lg-8 col-xl-4'>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">
                                        Products
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/view-order">
                                        My Order
                                    </Link>
                                </li>


                                <li className="nav-item dropdown">

                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{accessName}&nbsp;</a>
                                    <div className="dropdown-menu">
                                        <Link className="nav-link" to={''} onClick={logOut}> Log out</Link>
                                    </div>




                                </li>

                            </ul>
                        </div>
                    </nav>

                </div>

            </div>

        </>
    )
}
