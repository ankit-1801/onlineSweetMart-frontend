import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemService from "../services/ItemService";
import OrdersService from "../services/OrdersService";
import { ToastContainer, toast } from 'react-toastify';
toast.configure()
export default function MyOders() {

    const [orders,setOrders] = useState([])
    const [data, setData] = useState({userId: 0,totalCost: 0,sweetItemList: []});

    const alertmsg = () => {
      toast.success("Your order has been placed..", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
  }

    useEffect(()=>{
        OrdersService.getUserOrders("77").then((res)=>{
            setOrders(res.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    const [orderList, setOrderList] = useState([]);

    const handleReorder=(e,order)=>{
        e.preventDefault();
        if(window.confirm("Confirm your purchase!!!")==true){

          const sweetlist = [];
          order.sweetItemList.map((item,index)=>{
              const sweetItemId = Number(item.sweetItemId);
              const purchaseQuantity = Number(item.purchaseQuantity);
              const sweetItemName = item.sweetItemName;
              const li = {
                  sweetItemId
                  ,purchaseQuantity,
                  sweetItemName
              };
              sweetlist.push(li)
          })  
            setData(data => {
            return { totalCost: order.totalCost, userId: order.userId,sweetItemList: sweetlist}
        })
        }
    }

    useEffect(() => {
      if (data.totalCost != 0) {
          OrdersService.createOrder(data).then((response) => {

              console.log(response);

              <ToastContainer />
              alertmsg("Your order has been placedd..");

          }).catch(error => {
              console.log(error);
          })
          data.sweetItemList.map((item,index)=>{
            ItemService.getQuantity(item.sweetItemId).then((response) => {

              const oldquantity = response.data;
              // alert(Number(oldquantity)- Number(item.quantity))
              const quantity = String((Number(oldquantity) - Number(item.purchaseQuantity)))
              const data = { quantity }

              ItemService.updateSweetItem(Number(item.sweetItemId), data).then((response) => {
              }).catch(error => {
                  console.log(error);
              })

          })
          })
          window.location.reload();
      }
  }, [data])

    return(
        <div className="pb-5">
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
            <div className="my-3" style={{ 'overflow': 'auto', 'height': '300px' }}>
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
                          <Link to={"/order/details/"+order.orderId} className="btn p-0">
                          {order.orderId}
                          </Link>
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
                        <td>
                          {
                            order.status === "cancelled" &&(
                              <button type="button" className="btn-success btn-sm p-0" onClick={(e)=>handleReorder(e,order)}>Reorder</button>
                            )
                          }
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