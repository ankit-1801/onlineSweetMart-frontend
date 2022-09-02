import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useCart } from "react-use-cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import OrdersService from "../services/OrdersService";
import { ToastContainer, toast } from 'react-toastify';
import ItemService from '../services/ItemService';
toast.configure()
export default function Cart() {
    // const[amount , setAmount] = useState(()=> 0)
    // const[customerId ,setCustomerId] = useState(()=>0)
    const [data, setData] = useState({userId: 0,totalCost: 0,sweetItemList: []});

    const {
        isEmpty,
        totalUniqueItems,
        clearCartMetadata,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
        inCart,
        getItem
    } = useCart();


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

    function buyProduct(e) {
        if(localStorage.getItem('token') === null){
            alert("please login first!!");
        }
        else{
            const sweetlist = [];
            items.map((item,index)=>{
                const sweetItemId = Number(item.id);
                const purchaseQuantity = Number(item.quantity);
                const sweetItemName = item.title;
                const li = {
                    sweetItemId
                    ,purchaseQuantity,
                    sweetItemName
                };
                sweetlist.push(li)
            })    
        setData(data => {
            return { totalCost: cartTotal, userId: Number(JSON.parse(localStorage.getItem('user')).userid),sweetItemList: sweetlist }
        })
     }
    }

    const updateItemQuant = (id, newQuantity) => {
        ItemService.getQuantity(id).then((response) => {
            // alert(getItem(id).quantity +"---------"+ response.data)
            if (inCart(id) && newQuantity <= response.data) {
                updateItemQuantity(id, newQuantity);
            }
        }).catch(error => {
            console.log(error);
        })
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

            items.map((item, index) => {


                ItemService.getQuantity(item.id).then((response) => {

                    const oldquantity = response.data;
                    // alert(Number(oldquantity)- Number(item.quantity))
                    const quantity = String((Number(oldquantity) - Number(item.quantity)))
                    const data = { quantity }

                    ItemService.updateSweetItem(Number(item.id), data).then((response) => {
                    }).catch(error => {
                        console.log(error);
                    })

                })

            })

            emptyCart();
        }
    }, [data])


    if (isEmpty) return <h5 style={{ color: "red" }} className="text-center ">Your Cart is Empty!</h5>

    return (
        <section className="py-4 container"  >
            <div className="row justify-content-center">
                <div className="col-12">
                    {/* <h5>Cart({totalUniqueItems})total Items:({totalItems})</h5> */}
                    <table className="table table-light table-hover table-sm text-xsmall" style={{ fontSize: '1rem' }}>
                        <tbody >
                            {items.map((item, index) => {
                                return (
                                    <tr key={index} className="row ">
                                        <td className="col-2">
                                            <img src={item.img} style={{ height: '1rem' }} />
                                        </td>
                                        <td className="col-3 text-left">{item.id}</td>
                                        <td className="col-1">₹{item.price}</td>
                                        <td className="container-fluid col-5">
                                            <div className="row">
                                                <div className="col-2 center-block">
                                                    <button
                                                        className="btn btn-primary  btn-sm"
                                                        onClick={() => updateItemQuant(item.id, item.quantity - 1)}
                                                    >-</button>
                                                </div>
                                                <div className="col-2 center-block ">
                                                    <h5 style={{ textAlign: "center", color: 'black' }} > {item.quantity}</h5>
                                                </div>
                                                <div className="col-2 center-block">
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => updateItemQuant(item.id, item.quantity + 1)}
                                                    >+</button>
                                                </div>
                                                <div className="col-5  text-right px-4">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeItem(item.id)}
                                                    >X</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <hr />
                <div className="container">
                    <div className="col-auto ms-auto text-right">
                        <h6>Total Price: ₹{cartTotal}</h6>

                    </div>
                    <div className="col-auto text-right">
                        <button
                            className="btn btn-danger btn-sm "
                            onClick={() => emptyCart()}
                        >Clear Cart  </button>
                        <button className="btn btn-primary btn-sm" onClick={(e) => buyProduct(e)}>Buy Now </button>
                    </div>
                </div>
            </div>
        </section>

    );
}