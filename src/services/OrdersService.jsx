import axios from 'axios';

const ORDERS_BASE_REST_API_URl = 'http://localhost:9191/order' ;

class OrderService{
    getAllOrders(){
        return axios.get(ORDERS_BASE_REST_API_URl + "/readAllOrder")
    }
    updateOrder(orderId ,order){
        return axios.patch(ORDERS_BASE_REST_API_URl + "/updateOrder/" + orderId,order)
    }
    createOrder(order){
        return axios.post(ORDERS_BASE_REST_API_URl + "/createOrder" , order)
    }
    getOrderByCustomerId(customerId){
        return axios.get(ORDERS_BASE_REST_API_URl + "/getUserOrders/" + customerId)
    }
}

export default  new OrderService();