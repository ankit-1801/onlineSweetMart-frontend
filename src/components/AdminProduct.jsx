import React, { useState, useEffect } from 'react';
import ItemService from "../services/ItemService";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
toast.configure()
//import {useNavigate} from 'react-router-dom';

export default function AdminProduct() {
  const [sweetItemId, setSweetItemId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("");   //imageUrl
  const [foodItems, setFoodItems] = useState([]);
  const [stock, setStock] = useState(0);



  //Add Food Item
  const addFood = (e) => {
    e.preventDefault();
    const foodItem = { name, price, quantity, description }

    const data = new FormData();

    data.append("file", imageFile);
    data.append('sweetItems', JSON.stringify(foodItem))

    const alertmsg1 = () => {
      toast.success("Product added..", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    ItemService.addSweetItem(data).then(() => {
      <ToastContainer />
      alertmsg1();
    }).catch(error => {
      console.log(error);
    })

  }

  //methode to update quantity of fooditem
  const updateStock = (newQuantity, oldQuantity) => {
    if (Number(newQuantity) + Number(oldQuantity) < 0)
      setStock(0);
    else
      setStock(Number(newQuantity) + Number(oldQuantity));

  }

  useEffect(() => {
    setQuantity(Number(stock));
  }, [stock])

  const updateQuantity = (sweetItemId) => {
    const data = { quantity }
    ItemService.updateSweetItem(sweetItemId, data).then((response) => {
    }).catch(error => {
      console.log(error);
    })
    window.location.reload();
  }

  //useEffect to get all food items
  useEffect(() => {
    getAllFoodItems();
  }, [])


  //Get all items
  const getAllFoodItems = () => {
    ItemService.getAllSweetItem().then((response) => {
      setFoodItems(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }


  //Delete an item
  const deleteFoodItem = (sweetItemId) => {
    ItemService.deleteSweetItem(sweetItemId).then((response) => {
      getAllFoodItems();

    }).catch(error => {
      console.log(error);
    })

  }

  return (
    // Add Product code of front-end
    <div>
      <div className="container my-2 w-100 rounded-3 " id="product-heading" style={{
        '--color-1': 'deepskyblue', '--color-2': 'gray',
        background: `
    linear-gradient(
      120deg,
      var(--color-1),
      var(--color-2) 80%
    )`
      }}>
        <div className="container" id="Add-Product" >
          <div className="container p-4 ">
            <h4> Product List</h4>
            {/* Table for Showing Food items Already available */}
            <div style={{ 'overflow': 'auto', 'height': '350px' }}>
              <table className="table table-sm" style={{ fontFamily: "serif" }} >
                {/* Table Heading */}
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col"></th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {
                    foodItems.map(
                      item =>
                        <tr key={item.sweetItemId}>
                          <td> {item.sweetItemId} </td>
                          <td> {item.name} </td>
                          <td> {item.price} </td>
                          <td> {item.quantity} </td>
                          <td>
                            <input type="number" className="rounded " placeholder="stock" width="40" size="2" style={{ width: '80px', height: '31px', padding: '0px' }} required onChange={(e) => updateStock(item.quantity, e.target.value)} ></input>
                            <button type="button" className="btn btn-warning btn-sm p-0" onClick={() => updateQuantity(item.sweetItemId)}>update</button>
                          </td>
                          <td> {item.description} </td>
                          <td>
                            <Link  to={'/user/product/update/'+item.sweetItemId} className="btn btn-success btn-sm p-0">Update</Link>
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm p-0" onClick={() => deleteFoodItem(item.sweetItemId)} >Delete</button>
                          </td>
                        </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          {/* Button For Adding Products */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5 p-3">
            <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#addProduct">Add Products</button>
            {/* Modal for Adding Product */}
            <div className="modal fade" id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content bg-light text-dark" id="modal-body" style={{
                  '--color-1': 'deepskyblue', '--color-2': 'gray',
                  background: `
      linear-gradient(
        120deg,
        var(--color-1),
        var(--color-2) 70%   
      )`
                }}>
                  <form>
                    <div className="modal-header">
                      <h6 className="modal-title" id="exampleModalLabel">Add Products</h6>
                      <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <div className="col">
                          <label htmlFor="foodname">SweetItem Name</label>
                          <input type="text" className="form-control" placeholder="Enter Food Item Name" name="foodname" id="foodname" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="col">
                          <label htmlFor="price">Price</label>
                          <input type="text" className="form-control" placeholder="Enter Price" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="col">
                          <label htmlFor="quantity">Stock</label>
                          <input type="text" className="form-control" placeholder="Number of items available" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                        </div>
                      </div>
                      <div className="form-group tm-form-group mb-3">
                        <label htmlFor="description">SweetItem Description</label>
                        <textarea className="form-control tm-form-control validate tm-small" placeholder='Enter Description Here' id="description" name="description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                      </div>
                      {/* For Image uploading */}
                      <div class="mb-3">
                        <label htmlFor="formFile" class="form-label">Upload Image of SweetItem Item</label>
                        <input class="form-control" type="file" id="image" alt="_img" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-success btn-sm" onClick={(e) => { addFood(e); window.location.reload(); }} >Add Item</button>
                      <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Button For deleting Products */}
            {/* <button className="btn btn-danger btn-sm ms-3" type="button" data-bs-toggle="modal" data-bs-target="#deleteproduct" >Delete Products</button> */}
            <div className="modal fade" id="deleteproduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Delete Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <div className="col">
                        <label htmlFor="foodname">SweetItem Id</label>
                        <input type="text" className="form-control" placeholder="Enter Food Id you want to delete" name="sweetItemId" id="sweetItemId" value={sweetItemId} onChange={(e) => setSweetItemId(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger btm-sm p-0" onClick={() => { deleteFoodItem(sweetItemId); window.location.reload(); }} >Delete Product</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
