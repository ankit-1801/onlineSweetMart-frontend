import React from "react";
import { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";

export default function EnterOtp() {

    let navigator = useNavigate();
    const params = useParams();
    const [resetPass, setResetPass] = useState({
        otp: "",
        newPassword: "",
        email: params.username
    });
    const [confirmPass, setConfirmPass] = useState();
    const [error, setError] = useState();
    const [error1, setError1] = useState();



    const handleChange = (e) => {
        setResetPass({ ...resetPass, [e.target.name]: e.target.value })
    }
    const handleChangeConfim = (e) => {
        setConfirmPass(e.target.value)
    }
    const errorMessage = () => {
        return (
            <div
                className="error text-danger"
                style={{
                    display: error ? '' : 'none',
                }}>
                <p>Password dont match!</p>
            </div>
        );
    };
    const error1Message = () => {
        return (
            <div
                className="error text-danger"
                style={{
                    display: error1 ? '' : 'none',
                }}>
                <p>Enter valid OTP!</p>
            </div>
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (resetPass.newPassword !== confirmPass) {
            setError(true);
            setError1(false);
        }
        else {
            UserService.changePassword(resetPass)
                .then((res) => {
                    if (res.status === 200) {
                        alert("password Changed Successfully!!");
                        navigator("/login");
                    }
                }).catch(err => console.log(err))
            setError(false);
            setError1(true);
        }
    }


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
                        <div className="modal-header px-2 pt-2 mb-3">
                            <h6 className="text-success" id="exampleModalLabel">OTP has been sent to your email!<br />Please enter it.</h6>
                        </div>
                        <div className="messages px-2 pt-1 mb-2">
                            {errorMessage()}
                        </div>
                        <div className="messages px-2 pt-1 mb-2">
                            {error1Message()}
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <div className="col px-3">
                                    <input type="number" className="form-control" placeholder="Enter Valid OTP" name="otp" id="otp" value={resetPass.otp} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="col px-3">
                                    <input type="text" className="form-control" placeholder="new password" name="newPassword" id="password" value={resetPass.newPassword} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="col px-3">
                                    <input type="text" className="form-control" placeholder="confirm new password" name="newPassword" id="password" value={confirmPass} onChange={handleChangeConfim} required />
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