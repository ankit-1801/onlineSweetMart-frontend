import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OrdersService from "../services/OrdersService";
import UserService from "../services/UserService";
 
export default function OrderDetails() {
    let navigate = useNavigate();
    const params = useParams();
  const [orderDet,setOrderDet] = useState();
  
  useEffect(()=>{
    if(localStorage.getItem('user')){
    OrdersService.getSweetItemListByOrderId(params.id).then((res)=>{
        const u = res.data;
        setOrderDet(u);
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
              <h6 className="modal-title" id="exampleModalLabel">Order Id:{params.id}</h6>
            </div>
            <h6 className="modal-title px-2" id="exampleModalLabel">Order Items:</h6>
            <hr/>
            <div className="p-2">
            <table className="table table-sm" style={{ fontFamily: "serif" }} >
              <thead>
                <tr>
                  <th scope="col" >SweetItemId</th>
                  <th scope="col">SweetItem Name</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              {orderDet && (
                <tbody>
                  {orderDet && orderDet.map((order) =>

                    <tr>
                      <td scope='row'>
                        {order.sweetItemId}
                      </td>
                      <td>
                        {order.sweetItemName}
                      </td>
                      <td>
                        {order.purchaseQuantity}
                      </td>
                    </tr>
                  )
                  }
                </tbody>
              )}
              <tbody>
              </tbody>
            </table>
            </div>
            <hr/>
            <div className="modal-footer px-3 pb-2">

            {
                localStorage.getItem('role')==='ROLE_USER' &&
                <Link  to= "/user/orders" className="btn btn-success btn p-1">Back</Link>
            }
            {
                localStorage.getItem('role')==='ROLE_ADMIN' &&
                <Link  to= "/admin/orders"  className="btn btn-success btn p-1">Back</Link>
            }
            </div>
        </div>
      </div>
    </div>
    )
}