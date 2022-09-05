import React ,{useState} from "react";
import UserService from "../services/UserService";

export default function Login() {
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handdivng the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handdivng the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handdivng the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handdivng the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      UserService.signUpUser({name,email,password}).then((res)=>{
          console.log(res);
      }).catch(err=> console.log(err))
      setSubmitted(true);
      setError(false);
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success text-success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h6>User {name} successfully registered!!</h6>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error text-danger"
        style={{
          display: error ? '' : 'none',
        }}>
        <h6>Please enter all the fields</h6>
      </div>
    );
  };
 
  return (
    <div className="" style={{paddingLeft:"40%",paddingRight:"20%"}}>
    <div className="form text-white">
      <div>
        <h1>User Registration</h1>
      </div>
 
      {/* Caldivng to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <form onSubmit={handleSubmit}>
        {/* Labels and inputs for form data */}
        {/* <ul> */}
          <div>
        <label className="label">Name</label><br/>
        <input onChange={handleName} className="input"
          value={name} type="text" />
        </div>
        <div>
        <label className="label">Email</label><br/>
        <input onChange={handleEmail} className="input"
          value={email} type="email" />
        </div>
        <div>
        <label className="label">Password</label><br/>
        <input onChange={handlePassword} className="input"
          value={password} type="password" />
        </div>
        <div className=" pt-2 pb-4">
        <button className="btn btn-sm btn-success" type="submit">
          Submit
        </button>
        </div>
        {/* </ul> */}
      </form>
      </div>
    </div>
  );
}