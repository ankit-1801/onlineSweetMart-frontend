import React, { useState, useEffect } from "react";
import axios from "axios";
import UserService from "../services/UserService";
import { useNavigate, useParams } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({ username: "", password: "" });

    const handleInputChange = (e) => {
        //   event.persist();
        console.log(e);
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
     if(inputs.username.length >0){
       const tokenApi =  UserService.getToken(inputs)
       const userApi =  UserService.loadUserByUsername(inputs.username)
       axios.all([tokenApi,userApi]).then(
         axios.spread((...alldata) =>{
           const tokenData = alldata[0];
           const user = alldata[1];
           console.log(tokenData)
           console.log(user)
           if(tokenData.status==200 && user.status ==200){
               localStorage.setItem('token',tokenData.data.token)
               localStorage.setItem('role',user.data.role)
               localStorage.setItem('user',JSON.stringify(user.data))
               alert("login successful!!");
           }
          else if(tokenData.status== 500 || user.data.role === 'ROLE_ADMIN'){
             alert("bad Credential!!");
           }

          })
         ).catch(error=>{
           alert("bad Credential!!");
         })
        }
        if(localStorage.getItem('token'))alert("bad Credential!!")
        window.open("/", "_self");
    }
    return (
        <div>
            <section class="vh-100 text-white">
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://static.toiimg.com/photo/87304656.cms"
                                class="img-fluid" alt="doctor-appointment" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                {/* Email input */}
                                <div class="form-outline mb-4" >
                                    <input type="email"
                                        id="username"
                                        class="form-control form-control-lg"
                                        name="username"
                                        onChange={handleInputChange}
                                        value={inputs.username}
                                        required
                                        placeholder="Enter a valid email address"
                                        
                                    />
                                    <label class="form-label" for="username">Email address</label>
                                </div>

                                {/* Password input */}
                                <div class="form-outline mb-3">
                                    <input type="password"
                                        id="password"
                                        name='password'
                                        class="form-control form-control-lg"
                                        onChange={handleInputChange}
                                        value={inputs.password}
                                        placeholder="Enter password"
                                    />
                                    <label class="form-label" for="password">Password</label>
                                </div>

                                {/* <div class="d-flex justify-content-between align-items-center">
                        
                        <a href="#!" class="text-body">Forgot password?</a>
                    </div> */}

                                <div class="text-center text-lg-start mt-4 pt-2 btn1">
                                    <button
                                        type="submit"
                                        class="btn btn-primary btn-lg"
                                        
                                    >
                                        Login
                                    </button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/userregistration"
                                        class="link-danger">Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}