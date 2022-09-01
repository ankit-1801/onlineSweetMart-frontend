import React, { useState, useEffect } from "react";
import OrdersService from "../services/OrdersService";

export default function MyOders() {

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        OrdersService.getUserOrders("77").then((res)=>{
            setOrders(res.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])


    const [orderList, setOrderList] = useState([]);
    return(
        <div>
        <div className="container rounded-3 my-2" style={{
          '--color-1': 'deepskyblue', '--color-2': 'gray',
          background: `
      linear-gradient(
        120deg,
        var(--color-1),
        var(--color-2) 80%
      )`
        }}>
          <div className='container p-4'>
            <div>
              <h4>My Orders</h4>
            </div>
            <div className="my-3" style={{ 'overflow': 'auto', 'height': '500px' }}>
              <table className="table table-sm" style={{ fontFamily: "serif" }} >
                <thead>
                  <tr>
                    <th scope="col" >OrderId</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Dispatch Date</th>
                  </tr>
                </thead>
                {orders && (
                  <tbody>
                    {orders && orders.map((order) =>
  
                      <tr className={order.status === "delivered" ? 'table-success'
                        : order.status === "cancelled" ? 'table-danger' : ""} >
                        <th scope='row'>
                          {order.orderId}
                        </th>
                        <td >
                          {order.status}
                        </td>
                        <td>
                          {order.totalCost}
                        </td>
                        <td>
                          {order.orderDate}
                        </td>
                        <td>
                          {order.dispatchDate}
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
          </div>
        </div>
      </div>
    )
}