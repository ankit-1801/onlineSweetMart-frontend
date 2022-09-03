import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import OrdersService from '../services/OrdersService';
export default function AdminOrders() {



  const [orderList, setOrderList] = useState([]);
  const [option_select, setOption_select] = useState([]);
  const [orderid, setOrderId] = useState();
  const handleChange = (event, order_id) => {

    setOrderId(order_id);
    setOption_select({ status: event.target.value });

  };

  useEffect(() => {
    let element = { status: option_select.status }
    if (orderid) {
      OrdersService.updateOrder(orderid, element).then(() => {
        if (option_select) window.location.reload();
      }).catch(
        error => {
          console.log(error)
        }
      );
    }
  }, [option_select]);

  useEffect(() => {
    OrdersService.getAllOrders().then((response) => {
      setOrderList(response.data)
    }).catch(error => {
      console.log(error);
    })
  }, []);


  return (
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
            <h4>Customers orders list</h4>
          </div>
          <div className="my-3" style={{ 'overflow': 'auto', 'height': '300px' }}>
            <table className="table table-sm" style={{ fontFamily: "serif" }} >
              <thead>
                <tr>
                  <th scope="col" >OrderId</th>
                  <th scope="col" >UserId</th>
                  <th scope="col">Status</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Dispatch Date</th>
                </tr>
              </thead>
              {orderList && (
                <tbody>
                  {orderList && orderList.map((order) =>

                    <tr className={order.status === "delivered" ? 'table-success'
                      : order.status === "cancelled" ? 'table-danger' : ""} >
                      <th scope='row'>
                        <Link to={"/order/details/"+order.orderId} className="btn p-0">
                        {order.orderId}
                        </Link>
                      </th>
                      <td>
                        <Link to={"/user/details/"+order.userId} className="btn p-0">
                        {order.userId}
                        </Link>
                      </td>
                      <td >
                        <select className="form-select-sm" aria-label="Default select example" name='option_select'
                          value={option_select}
                          onChange={(event) => handleChange(event, order.orderId)}>
                          <option value="">{order.status}</option>
                          <option value="packing">packing</option>
                          <option value="pending">pending</option>
                          <option value="out for delivery">out for delivery</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="delivered">Delivered</option>
                        </select>
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
