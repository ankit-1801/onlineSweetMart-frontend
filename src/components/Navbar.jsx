import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from '../images/logo.jpg';
import cart from '../images/cart.png';
import { Button, Modal } from 'react-bootstrap';
export default function Navbar() {
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={Logo} width="55" height="55" className="nav-ap-0 rounded-3" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/admin/orders">ORDERS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/admin/products">PRODUCTS</Link>
              </li>

            
            </ul>


              {/* {localStorage.getItem('token') && (
                <li className="nav-item">
                  <button className="btn btn--outline-success text-white nav-ame-1" type="button" data-bs-toggle="modal" data-bs-target="#details" ><small>DETAILS</small></button>
                  <button className="btn btn--outline-success text-white nav-ame-1" type="button" data-bs-toggle="modal" data-bs-target="#myorder" > <small> MY ORDERS </small></button>
                  <button className="btn btn--outline-success text-white nav-ame-1" type="button" ><small> LOGOUT  </small></button>
                </li>)
              } */}
              <li className="nav-item pb-4">
              <Link  className="nav-link active text-white nav-ame-1" aria-current="page" to="/user/details">DETAILS</Link>
              </li>
              <li className="nav-item pb-4">
              <Link  className="nav-link active text-white nav-ame-1" aria-current="page" to="/user/orders">MY ORDERS</Link>
              </li>
              <li className="nav-item pb-4">
              <Link  className="nav-link active text-white nav-ame-1" aria-current="page" to="/logout">LOGOUT</Link>
                </li>


              
                {localStorage.getItem('token') == null && (
                <li className="nav-item pb-4">
                  {/* <button className="btn btn--outline-success text-white nav-ame-1" type="button" ><small>LOGIN</small></button> */}
                  {/* <button className="btn btn--outline-success text-white nav-ame-1" type="button"  ><small>SIGNUP</small></button> */}
                  <Link  className="nav-link active text-white nav-ame-1" aria-current="page" to="/login">LOGIN</Link>
                  </li>
                )}
                {localStorage.getItem('token') == null && (
                  <li className="nav-item pb-4">
                  <Link  className="nav-link active text-white nav-ame-1" aria-current="page" to="/signup">REGISTER</Link>
                  </li>
                )}
            <Button variant="dark p-0 pe-2 ps-2" data-toggle="tooltip" data-placement="bottom" title="Cart" >
              <img src={cart} width="55" height="55" className=" bg-light rounded-3" />
            </Button>
          </div>
        </div>
      </nav>
        </>
    );
}