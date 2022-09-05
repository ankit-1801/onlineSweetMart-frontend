import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';
import UserService from '../services/UserService';
export default function UpdateUser() {

  const [user, setUser] = useState({
    userid:"",
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  let navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    UserService.readUser(params.id)
      .then((res) => { setUser(res.data); })
      .catch((error) => console.log(error));
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    // send put request to update
    UserService.updateUser(user.userid, user)
      .then((res) => {
      })
      .catch((error) => console.log(error));
      navigate("/user/details/"+params.id);
  };


  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy sweetItem details to newSweetItem obj
    const newUser = { ...user };

    //sweetItem.name ="gulab";
    //sweetItem["name"] = "gulab";
    //update newSweetItem object
    newUser[event.target.name] = event.target.value;

    // update emp obj with newEmp obj details
    setUser(newUser);
  };

  return (
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
            <form onSubmit={handleSubmit}>
              <div className="modal-header px-2 pt-2">
                <h6 className="modal-title" id="exampleModalLabel">Update User</h6>
              </div>
              <hr/>
              <div className="modal-body" style={{overflow:'auto','height': '400px'}}>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="name">User name</label>
                    <input type="text" className="form-control" placeholder="Enter Food Item Name" name="name" id="name" value={user.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" placeholder="Enter Valid Email" name="email" id="email" value={user.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" placeholder="enter street" name="street" id="street" value={user.street} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" placeholder="enter city" name="city" id="city" value={user.city} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="state">State</label>
                    <input type="text" className="form-control" placeholder="enter state" name="state" id="state" value={user.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="pincode">Pincode</label>
                    <input type="Number" className="form-control" placeholder="Number of items available" name="pincode" id="pincode" value={user.pincode} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <hr/>
              <div className="modal-footer px-3 pb-2">
                <button type="submit" className="btn btn-success btn p-1" >Update </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}