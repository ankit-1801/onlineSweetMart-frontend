import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";

export default function MyDetails() {
  
  let navigate = useNavigate();
  const params = useParams();
  const [user,setUser] = useState({
    userid:"",
    name:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:""
  });
  useEffect(()=>{
    if(localStorage.getItem('token')){
    UserService.readUser(params.id).then((res)=>{
        const u = res.data;
        setUser(u);
    }).catch(err=>console.log(err));
    }
  },[])

    return(
      <div style={{paddingLeft:'33%',paddingRight:'33%',paddingBottom:"5%"}} id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog pb-5">
        <div className="modal-content text-dark rounded-3" id="modal-body" style={{
              '--color-1': 'deepskyblue', '--color-2': 'gray',
               background: `
                           linear-gradient(
                             120deg,
                             var(--color-1),
                             var(--color-2) 70%   
                           )`
        }}>
            <div className="modal-header px-2 pt-2">
              <h6 className="modal-title" id="exampleModalLabel">My Details</h6>
            </div>
            <hr/>
            <div className="px-4">
              <div className="mb-2 row">
                <div className="col px-3 col">
                  <h6 htmlFor="foodname">Name :</h6>
                </div>
                <div className="col  col">
                  <label htmlFor="name">{user.name}</label>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col px-3 col">
                  <h6 htmlFor="foodname">Email :</h6>
                </div>
                <div className="col  col">
                  <label htmlFor="email">{user.email}</label>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col px-3 col">
                  <h6 htmlFor="Street">Street :</h6>
                </div>
                <div className="col  col">
                  <label htmlFor="street">{user.street}</label>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col px-3 col">
                  <h6 htmlFor="city">City :</h6>
                </div>
                <div className="col  col">
                  <label htmlFor="city">{user.city}</label>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col px-3 col">
                  <h6 htmlFor="state">State :</h6>
                </div>
                <div className="col  col">
                  <label htmlFor="state">{user.state}</label>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col px-3 col">
                  <h6 htmlFor="Pin">Pincode :</h6>
                </div>
                <div className="col  col">
                  <label htmlFor="Pin">{user.pincode}</label>
                </div>
              </div>
            </div>
            <hr/>
            <div className="modal-footer px-3 pb-2">
            {
                localStorage.getItem('role')==='ROLE_USER' &&
                <Link  to={"/user/update/"+user.userid} className="btn btn-success btn-sm p-1">Update</Link>
            }
            {
                localStorage.getItem('role')==='ROLE_ADMIN' &&
                <Link  to= "/admin/orders"  className="btn btn-success btn-sm p-1">Back</Link>
            }
            </div>
        </div>
      </div>
    </div>
    )
}