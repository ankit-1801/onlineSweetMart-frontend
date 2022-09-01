import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';
export default function UpdateProduct() {

  const [sweetItem, setSweetItem] = useState({
    sweetItemId: "",
    name: "",
    price: "",
    quantity: "",
    description: ""
  });
  let navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    ItemService.getSweetItemById(params.id)
      .then((res) => { setSweetItem(res.data); })
      .catch((error) => console.log(error));
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    // send put request to update
    ItemService.updateSweetItem(params.id, sweetItem)
      .then((res) => {
        navigate("/admin/products");
      })
      .catch((error) => console.log(error));
  };


  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy sweetItem details to newSweetItem obj
    const newSweetItem = { ...sweetItem };

    //sweetItem.name ="gulab";
    //sweetItem["name"] = "gulab";
    //update newSweetItem object
    newSweetItem[event.target.name] = event.target.value;

    // update emp obj with newEmp obj details
    setSweetItem(newSweetItem);
  };

  return (
      <div style={{paddingLeft:'33%',paddingRight:'33%'}} id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
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
                <h6 className="modal-title" id="exampleModalLabel">Update Product</h6>
              </div>
              <hr/>
              <div className="modal-body">
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="foodname">SweetItem Name</label>
                    <input type="text" className="form-control" placeholder="Enter Food Item Name" name="name" id="name" value={sweetItem.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="price">Price</label>
                    <input type="Number" className="form-control" placeholder="Enter Price" name="price" id="price" value={sweetItem.price} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col px-3">
                    <label htmlFor="quantity">Stock</label>
                    <input type="Number" className="form-control" placeholder="Number of items available" name="quantity" id="quantity" value={sweetItem.quantity} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group tm-form-group mb-3 px-3">
                  <label htmlFor="description">SweetItem Description</label>
                  <textarea className="form-control tm-form-control validate tm-small" placeholder='Enter Description Here' id="description" name="description" rows="2" value={sweetItem.description} onChange={handleChange} required></textarea>
                </div>
              </div>
              <hr/>
              <div className="modal-footer px-3 pb-2">
                <button type="submit" className="btn btn-success btn-sm" >Update </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}