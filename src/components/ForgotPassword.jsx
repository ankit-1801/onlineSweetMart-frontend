import React from "react";
import { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ForgotPassword() {
    let navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState();
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        UserService.loadUserByUsername(email).then((response)=>{
        if (response.status === 200) {
            UserService.generateOtp(email);
            navigator("/enter/otp/" + email);
        }}).catch(err=>console.log(err)); 
        setError(true);
    }

    const errorMessage = () => {
        return (
            <div
                className="error text-danger"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h6>User not registered!!</h6>
            </div>
        );
    };

    return (
        <div style={{ paddingLeft: '38%', paddingRight: '38%', paddingBottom: "5%" }} id="addProduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header px-2 pt-2 mb-2">
                            <h6 className="modal-title" id="exampleModalLabel">Enter your email address</h6>
                        </div>
                        <div className="messages px-2 pt-1 mb-2">
                            {errorMessage()}
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <div className="col px-3">
                                    <input type="email" className="form-control" placeholder="Enter Valid Email" name="email" id="email" value={email} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer px-3 pb-2">
                            <button type="submit" className="btn btn-success btn p-1" >Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}