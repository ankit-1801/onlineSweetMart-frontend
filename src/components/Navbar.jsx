import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../images/logo.jpg';
import cart from '../images/cart.png';
import Cart from "./Cart";
import { Button, Modal } from 'react-bootstrap';
export default function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);//cart modal

  return (
    <div className="pb-3">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div className="container-fluid m-0">
          <Link className="navbar-brand" to="/"><img src={Logo} width="55" height="55" className="nav-ap-0 rounded-3" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                localStorage.getItem('role')==="ROLE_ADMIN" &&  localStorage.getItem("token") &&
                (<li className="nav-item">
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/admin/home">HOME</Link>
                </li>)
              }

              {
                localStorage.getItem('role')==="ROLE_ADMIN" &&  localStorage.getItem("token") &&
                (<li className="nav-item">
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/admin/orders">ORDERS</Link>
                </li>)
              }

              { 
                localStorage.getItem('role')==="ROLE_ADMIN" &&  localStorage.getItem("token") &&
                (<li className="nav-item">
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/admin/products">PRODUCTS</Link>
                </li>)
              }
            </ul>
            
            {
              localStorage.getItem('role')!=="ROLE_ADMIN" &&  localStorage.getItem("token") &&
              (<li className="nav-item pb-4 px-2">
              <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/">HOME</Link>
              </li>)
            } 
            {
              localStorage.getItem('role')==="ROLE_USER" &&  localStorage.getItem("token") &&
              (<li className="nav-item pb-4 px-2">
              <Link className="nav-link active text-white nav-ame-1" aria-current="page" to= {"/user/details/"+JSON.parse(localStorage.getItem('user')).userid}>DETAILS</Link>
              </li>)
            } 

            { 
              localStorage.getItem('role')==="ROLE_USER" &&  localStorage.getItem("token") &&
              (<li className="nav-item pb-4 px-2">
              <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/user/orders">MY ORDERS</Link>
              </li>)
            } 

            { 
              localStorage.getItem('token') &&
              (<li className="nav-item pb-4 px-2">
              <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/logout">LOGOUT</Link>
              </li>)
            }


            {localStorage.getItem('token') === null && (
              <li className="nav-item pb-4 px-1">
                {/* <button className="btn btn--outline-success text-white nav-ame-1" type="button" ><small>LOGIN</small></button> */}
                {/* <button className="btn btn--outline-success text-white nav-ame-1" type="button"  ><small>SIGNUP</small></button> */}
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/login">LOGIN</Link>
              </li>
            )}
            {localStorage.getItem('token') === null && (
              <li className="nav-item pb-4 px-2">
                <Link className="nav-link active text-white nav-ame-1" aria-current="page" to="/signup">REGISTER</Link>
              </li>
            )}
            {
            localStorage.getItem('role')!=="ROLE_ADMIN"  &&
            (<Button variant="dark p-0 pe-2 ps-2" data-toggle="tooltip" data-placement="bottom" title="Cart" onClick={handleShow}>
              <img src={cart} width="55" height="55" className=" bg-light rounded-3" />
            </Button>)
            }
          </div>
        </div>
      </nav>


      {/* ************************My cart*********************** */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Your cart ,</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Cart />
        </Modal.Body>
      </Modal>
      <hr className="m-2" size="3" style={{ color: "white" }} />
    </div>
  )
}
